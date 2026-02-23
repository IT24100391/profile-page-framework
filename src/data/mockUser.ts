export type Role = "ADMIN" | "SECURITY_OFFICER" | "AREA_MANAGER" | "SUPER_ADMIN";
export type Sex = "MALE" | "FEMALE";
export type Designation = "LSO" | "JSO" | "SSO" | "CSO";
export type Equipment = "BATON" | "FLASHLIGHT" | "RADIO" | "HANDCUFFS" | "VEST" | "HELMET" | "WHISTLE" | "FIRST_AID_KIT" | "PEPPER_SPRAY" | "BODY_CAMERA";

export interface UserProfile {
  id: number;
  username: string;
  role: Role;
  firstLogin: boolean;
  active: boolean;
  fullName: string;
  nicNumber: string;
  sex: Sex;
  email: string;
  residentialAddress: string;
  mobileNumber: string;
  dateOfBirth: string;
  emergencyContact: string;
  photoPath: string | null;
  professionalCertificate: string;
  assignedArea: string;
  assignedCompany: string;
  joinDate: string;
  designation: Designation;
  basicSalary: number;
  adminPosition: string | null;
  specialSkills: string;
  handoverEquipment: Equipment[];
  bankName: string;
  bankAccountNumber: string;
  bankBranch: string;
  createdAt: string;
  updatedAt: string;
}

export const mockUser: UserProfile = {
  id: 1,
  username: "arjun.perera",
  role: "SECURITY_OFFICER",
  firstLogin: false,
  active: true,
  fullName: "Arjun Priyantha Perera",
  nicNumber: "198804523IV",
  sex: "MALE",
  email: "arjun.p@acefrontline.lk",
  residentialAddress: "45/A, High Level Road, Maharagama, Colombo, Sri Lanka",
  mobileNumber: "+94 77 123 4567",
  dateOfBirth: "1988-04-15",
  emergencyContact: "+94 77 987 6543",
  photoPath: null,
  professionalCertificate: "First Aid / CPR, Fire Safety Level 2, Advance Crowd Control",
  assignedArea: "Colombo City Centre",
  assignedCompany: "ABC Holdings PVT LTD",
  joinDate: "2020-03-15",
  designation: "SSO",
  basicSalary: 45000,
  adminPosition: null,
  specialSkills: "Tactical Communication, Emergency Response, CCTV Monitoring",
  handoverEquipment: ["RADIO", "BATON", "VEST", "FLASHLIGHT", "BODY_CAMERA"],
  bankName: "Commercial Bank",
  bankAccountNumber: "8012345678",
  bankBranch: "Maharagama",
  createdAt: "2020-03-15T08:00:00",
  updatedAt: "2024-01-20T14:30:00",
};

export const designationLabels: Record<Designation, string> = {
  LSO: "Leading Security Officer",
  JSO: "Junior Security Officer",
  SSO: "Senior Security Officer",
  CSO: "Chief Security Officer",
};

export const equipmentLabels: Record<Equipment, string> = {
  BATON: "Tactical Baton",
  FLASHLIGHT: "LED Flashlight",
  RADIO: "Tactical Radio - Motorola XPR",
  HANDCUFFS: "Steel Handcuffs",
  VEST: "Protective Vest",
  HELMET: "Tactical Helmet",
  WHISTLE: "Emergency Whistle",
  FIRST_AID_KIT: "First Aid Kit",
  PEPPER_SPRAY: "Pepper Spray",
  BODY_CAMERA: "Body Camera HD",
};

export const roleLabels: Record<Role, string> = {
  ADMIN: "Administrator",
  SECURITY_OFFICER: "Security Officer",
  AREA_MANAGER: "Area Manager",
  SUPER_ADMIN: "Super Administrator",
};
