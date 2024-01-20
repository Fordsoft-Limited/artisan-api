import { Advertisement } from "src/model/advertisement.schema";
import { Blogs } from "src/model/blog.schema";
import { Guests } from "src/model/guest.schema";
import { User } from "src/model/user.schema";

export class Mapper {
    static mapToAdvertisementResponse(advertisement: Advertisement): any {
      return {
        category: advertisement.category,
        description: advertisement.description,
        businessName: advertisement.businessName,
        websiteLink: advertisement.websiteLink,
        fileName: advertisement.fileName,
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
    static mapToUser(user: any): any {
      const contacts=this.mapToContactResponse(user.contact)
      return {
        username: user.username,
        id: user.id,
        name: contacts['name']
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
    static mapToBlogs(blog: Blogs): any {
      return {
       title: blog.title,
       description: blog.description,
       mediaName: blog.mediaName,
        author: this.mapToUser(blog['author']),
      };
    }
    static mapToGuest(guest:Guests):any{
      return{
        reasonForVisit:guest.reasonForVisit,
        methodOfContact: guest.methodOfContact,
        numberOfVisit: guest.numberOfVisit,
         contact: this.mapToContactResponse(guest['contact'])
      }
    }
  
  }
  