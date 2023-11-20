import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { Model } from "mongoose";
import { LoginRequest } from "src/entrance/model/login.model";
import { RecordNotFoundException } from "src/filters/app.custom.exception";
import { AccountActivationRequest } from "src/model/app.request.model";
import {
  ArtisanApiResponse,
  LoginResponse,
} from "src/model/app.response.model";
import { User } from "src/model/user.schema";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user._id,
    });
  }
  async activateAccount(
    payload: AccountActivationRequest
  ): Promise<ArtisanApiResponse> {
    const existingUser = await this.findUserByInvitationCode(
      payload.invitationCode
    );
    existingUser.password = await this.hashPassword(payload.password);
    existingUser.isActive = true;
    existingUser.isBlocked = false;
    existingUser.invitationCode = "";
    await existingUser.save();
    console.log("Activation completed, Password has now been set");
    return new ArtisanApiResponse(
      NotificationMessage.ACCOUNT_ACTIVATED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async findUserByInvitationCode(invitationCode: string): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ invitationCode: invitationCode })
      .exec();
    if (!existingUser)
      throw new RecordNotFoundException(
        NotificationMessage.INVALID_ACTIVATION_CODE
      );
    return existingUser;
  }
  public async validateLoginUser(
    login: LoginRequest
  ): Promise<ArtisanApiResponse> {
    const username = login.username;
    const user = await this.userModel
      .findOne({ username })
      .populate({
        path: "contact",
      })
      .exec();

    if (!user) {
      this.logger.debug(`User ${username} not found!`);
      throw new UnauthorizedException(NotificationMessage.INVALID_USER);
    }

    if (!(await bcrypt.compare(login.password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException(NotificationMessage.INVALID_USER);
    }
    return new ArtisanApiResponse({
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      username: user.username,

      token: this.getTokenForUser(user),
      contact: {
        category: user.contact['category'],
        name: user.contact['name'],
        phone: user.contact['phone'],
        email: user.contact['email'],
        street: user.contact['street'],
        city: user.contact['city'],
        postalCode: user.contact['postalCode']
      },
    },
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
}
