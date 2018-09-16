export class Address {
  street: string;
  house: string;
  local: string;
  city: string;
  postal_code: string;
  post_office_city: string;


  constructor(street: string, house: string, local: string, city: string, postal_code: string, post_office_city: string) {
    this.street = street;
    this.house = house;
    this.local = local;
    this.city = city;
    this.postal_code = postal_code;
    this.post_office_city = post_office_city;
  }
}


