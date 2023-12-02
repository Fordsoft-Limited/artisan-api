import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { Model } from "mongoose";
import { LoginRequest } from "src/entrance/model/login.model";
import { RecordNotFoundException } from "src/filters/app.custom.exception";
import { Advertisement } from "src/model/advertisement.schema";
import { AccountActivationRequest } from "src/model/app.request.model";
import {
  ArtisanApiResponse,
  LoginResponse,
} from "src/model/app.response.model";
import { User } from "src/model/user.schema";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Advertisement.name) private advertModel: Model<Advertisement>
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
    const userResponse =this.maptoUserResponse(user)
    return new ArtisanApiResponse({...userResponse, 
      token: this.getTokenForUser(user),
    },
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  private mapToAdvertisementResponse(advertisement: Advertisement):any{
    return {
      category: advertisement.category,
      description: advertisement. description,
      businessName: advertisement.businessName,
      websiteLink: advertisement.websiteLink,
      contact: {
        category: advertisement.contact['category'],
        name: advertisement.contact['name'],
        phone: advertisement.contact['phone'],
        email: advertisement.contact['email'],
        street: advertisement.contact['street'],
        city: advertisement.contact['city'],
        postalCode: advertisement.contact['postalCode']
      },
    }
  }

  private maptoUserResponse(user: User):any{
    return {
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      username: user.username,
      contact: {
        category: user.contact['category'],
        name: user.contact['name'],
        phone: user.contact['phone'],
        email: user.contact['email'],
        street: user.contact['street'],
        city: user.contact['city'],
        postalCode: user.contact['postalCode']
      },
    }
  }
 async listPaginatedAdvertisement(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const advertisement = await this.advertModel
      .find()
      .populate({
        path: "contact",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      advertisement.map(advertisement=>this.mapToAdvertisementResponse(advertisement)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }




  async getPaginatedUsers(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const users = await this.userModel
      .find()
      .populate({
        path: "contact",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      users.map(user=>this.maptoUserResponse(user)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
}
