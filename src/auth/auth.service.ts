import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { LoginRequest } from "src/entrance/model/login.model";
import { RecordNotFoundException } from "src/filters/app.custom.exception";
import { Mapper } from "src/mapper/dto.mapper";
import { Advertisement } from "src/model/advertisement.schema";
import { AccountActivationRequest } from "src/model/app.request.model";
import {
  ArtisanApiResponse,
} from "src/model/app.response.model";
import { Guests } from "src/model/guest.schema";
import { User } from "src/model/user.schema";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Guests.name) private guestsModel: Model<Guests>,
  ) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      roles: user.roles,
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
    const userResponse =Mapper.mapToUserResponse(user)
    return new ArtisanApiResponse({...userResponse, 
      token: this.getTokenForUser(user),
    },
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async getPaginatedVisitors(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const visitors = await this.guestsModel
      .find()
      .populate({
        path: "contact",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      visitors,
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
      users.map(user=>Mapper.mapToUserResponse(user)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
}
