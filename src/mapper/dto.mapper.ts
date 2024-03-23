import { Advertisement } from "src/model/advertisement.schema";
import { Artisan } from "src/model/artisan.schema";
import { User } from "src/model/user.schema";

export class Mapper {
  static mapToAdvertisementResponse(advertisement: Advertisement): any {
    return {
      id: advertisement["id"],
      category: advertisement.category,
      description: advertisement.description,
      businessName: advertisement.businessName,
      websiteLink: advertisement.websiteLink,
      fileName: advertisement.fileName,
      contact: this.mapToContactResponse(advertisement.contact),
    };
  }

  static mapToArtisanResponse(artisan: Artisan): any {
    return {
      id: artisan.id,
      businessType: artisan.businessType,
      rank: artisan.rank,
      businessName: artisan.businessName,
      websiteLink: artisan.websiteLink,
      serviceDescription: artisan.serviceDescription,
      logo: artisan.logo,
      contact: this.mapToContactResponse(artisan.contact),
    };
  }

  static mapToUserResponse(user: any): any {
    return {
      id: user.id,
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      username: user.username,
      contact: this.mapToContactResponse(user.contact),
    };
  }
  static mapToUser(user: any): any {
    const contacts = this.mapToContactResponse(user.contact);
    return {
      username: user.username,
      id: user.id,
      name: contacts.name,
    };
  }

  static mapToContactResponse(contact: any): any {
    return {
      category: contact?.category,
      name: contact?.name,
      phone: contact?.phone,
      email: contact?.email,
      street: contact?.street,
      city: contact?.city,
      postalCode: contact?.postalCode,
    };
  }
  static mapToBlogs(blog: any): any {
    return {
      id: blog.id,
      title: blog.title,
      description: blog.description,
      mediaName: blog.mediaName,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: this.mapToUser(blog.author),
    };
  }
  static mapToGuest(guest: any): any {
    return {
      id: guest.id,
      reasonForVisit: guest.reasonForVisit,
      methodOfContact: guest.methodOfContact,
      numberOfVisit: guest.numberOfVisit,
      createdAt: guest.createdAt,
      contact: this.mapToContactResponse(guest["contact"]),
    };
  }
  static parseJson<T>(payload: string): T {
    return JSON.parse(payload) as T;
  }
}
  