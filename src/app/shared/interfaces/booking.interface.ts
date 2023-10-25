export interface Booking {
    productName: string;
    name: string;
    email: string;
    resalePrice: number;
    phone: string;
    image: string;
    meetingLocation: {
      selectedDivision: string;
      selectedDistrict: string;
    };
    productId: string;  
  }