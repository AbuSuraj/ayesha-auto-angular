export interface Booking {
    productName: string;
    name: string;
    email: string;
    resalePrice: number;
    phone: string;
    meetingLocation: {
      selectedDivision: string;
      selectedDistrict: string;
    };
    productId: string;  
  }