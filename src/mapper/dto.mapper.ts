import { Advertisement } from "src/model/advertisement.schema";
import { Blogs } from "src/model/blog.schema";
import { User } from "src/model/user.schema";

export class Mapper {
    static mapToAdvertisementResponse(advertisement: Advertisement): any {
      return {
        category: advertisement.category,
        description: advertisement.description,
        businessName: advertisement.businessName,
        websiteLink: advertisement.websiteLink,
        contact: this.mapToContactResponse(advertisement.contact),
      };
    }
  
    static mapToUserResponse(user: User): any {
      return {
        isActive: user.isActive,
        isBlocked: user.isBlocked,
        username: user.username,
        contact: this.mapToContactResponse(user.contact),
      };
    }

     static mapToContactResponse(contact: any): any {
      return {
        category: contact.category,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        street: contact.street,
        city: contact.city,
        postalCode: contact.postalCode,
      };
    }

    static mapToBlogResponse(blog: Blogs): any {
      return {
        description: blog.description,
        title: blog.title,
        user: this.mapToContactResponse(blog.author),
      };
    }
  }
  