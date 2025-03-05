// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ArrowLeft, Save, Lock, User, Bell, Shield, Globe } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "sonner";

// const Settings = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state: any) => state?.auth);

//   const [formData, setFormData] = useState({
//     name: user?.name?.firstname || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     profileImage: user?.profileImage || "A",
//   });

//   const [notificationSettings, setNotificationSettings] = useState({
//     orderUpdates: true,
//     promotions: true,
//     newsletter: false,
//     productUpdates: true,
//   });

//   const [securitySettings, setSecuritySettings] = useState({
//     twoFactorEnabled: false,
//     loginAlerts: true,
//   });

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNotificationToggle = (setting: any) => {
//     setNotificationSettings((prev) => ({
//       ...prev,
//       [setting]: !prev[setting],
//     }));
//   };

//   const handleSecurityToggle = (setting: any) => {
//     setSecuritySettings((prev) => ({
//       ...prev,
//       [setting]: !prev[setting] ,
//     }));
//   };

//   const handleSaveProfile = () => {
//     toast.success("Profile information updated successfully");
//   };

//   const handleSavePassword = () => {
//     toast.success("Password updated successfully");
//   };

//   const handleSaveNotifications = () => {
//     toast.success("Notification preferences updated");
//   };

//   const handleSaveSecurity = () => {
//     toast.success("Security settings updated");
//   };

//   const handleBackToProfile = () => {
//     navigate("/profile");
//   };

//   // Get user initials for avatar fallback
//   const getUserInitials = () => {
//     if (!formData.name.firstname) return "U";
//     return formData.name.firstname
//       .split(" ")
//       .map((part : any) => part[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-8">
//           <Button
//             variant="ghost"
//             className="mr-4"
//             onClick={handleBackToProfile}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Profile
//           </Button>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//             Account Settings
//           </h1>
//         </div>

//         <Tabs defaultValue="profile">
//           <TabsList className="grid grid-cols-4 mb-8">
//             <TabsTrigger value="profile">
//               <User className="w-4 h-4 mr-2" />
//               <span className="hidden sm:inline">Profile</span>
//             </TabsTrigger>
//             <TabsTrigger value="password">
//               <Lock className="w-4 h-4 mr-2" />
//               <span className="hidden sm:inline">Password</span>
//             </TabsTrigger>
//             <TabsTrigger value="notifications">
//               <Bell className="w-4 h-4 mr-2" />
//               <span className="hidden sm:inline">Notifications</span>
//             </TabsTrigger>
//             <TabsTrigger value="security">
//               <Shield className="w-4 h-4 mr-2" />
//               <span className="hidden sm:inline">Security</span>
//             </TabsTrigger>
//           </TabsList>

//           {/* Profile Information */}
//           <TabsContent value="profile">
//             <Card className="dark:bg-[#131920]">
//               <CardHeader>
//                 <CardTitle>Profile Information</CardTitle>
//                 <CardDescription>
//                   Update your account profile information
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
//                   <Avatar className="w-24 h-24">
//                     <AvatarImage src={formData.profileImage} />
//                     <AvatarFallback className="text-xl">
//                       {getUserInitials()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 text-center sm:text-left">
//                     <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
//                       Profile Photo
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                       JPG, GIF or PNG. Max size of 800K
//                     </p>
//                     <div className="flex flex-wrap justify-center sm:justify-start gap-3">
//                       <Button size="sm" variant="outline">
//                         Upload new image
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
//                         Remove
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator />

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Your full name"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="your.email@example.com"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="(123) 456-7890"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="language">Preferred Language</Label>
//                     <Select defaultValue="en">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select language" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="en">English</SelectItem>
//                         <SelectItem value="es">Spanish</SelectItem>
//                         <SelectItem value="fr">French</SelectItem>
//                         <SelectItem value="de">German</SelectItem>
//                         <SelectItem value="ja">Japanese</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button onClick={handleSaveProfile}>
//                   <Save className="w-4 h-4 mr-2" />
//                   Save Changes
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>

//           {/* Password */}
//           <TabsContent value="password">
//             <Card className="dark:bg-[#131920]">
//               <CardHeader>
//                 <CardTitle>Change Password</CardTitle>
//                 <CardDescription>Update your account password</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="current-password">Current Password</Label>
//                   <Input id="current-password" type="password" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="new-password">New Password</Label>
//                   <Input id="new-password" type="password" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="confirm-password">Confirm New Password</Label>
//                   <Input id="confirm-password" type="password" />
//                 </div>

//                 <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 mt-6">
//                   <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
//                     Password Requirements
//                   </h4>
//                   <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
//                     <li>• Minimum 8 characters long</li>
//                     <li>• At least one uppercase letter</li>
//                     <li>• At least one number</li>
//                     <li>• At least one special character</li>
//                   </ul>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button onClick={handleSavePassword}>
//                   <Save className="w-4 h-4 mr-2" />
//                   Update Password
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>

//           {/* Notifications */}
//           <TabsContent value="notifications">
//             <Card className="dark:bg-[#131920]">
//               <CardHeader>
//                 <CardTitle>Notification Preferences</CardTitle>
//                 <CardDescription>
//                   Manage how you receive notifications
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                         Order Updates
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Receive notifications about your order status
//                       </p>
//                     </div>
//                     <Switch
//                       checked={notificationSettings.orderUpdates}
//                       onCheckedChange={() =>
//                         handleNotificationToggle("orderUpdates")
//                       }
//                     />
//                   </div>

//                   <Separator />

//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                         Promotions and Discounts
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Receive notifications about sales and special offers
//                       </p>
//                     </div>
//                     <Switch
//                       checked={notificationSettings.promotions}
//                       onCheckedChange={() =>
//                         handleNotificationToggle("promotions")
//                       }
//                     />
//                   </div>

//                   <Separator />

//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                         Newsletter
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Receive our weekly newsletter with new products and
//                         trends
//                       </p>
//                     </div>
//                     <Switch
//                       checked={notificationSettings.newsletter}
//                       onCheckedChange={() =>
//                         handleNotificationToggle("newsletter")
//                       }
//                     />
//                   </div>

//                   <Separator />

//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                         Product Updates
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Get notified when items on your wishlist are back in
//                         stock or on sale
//                       </p>
//                     </div>
//                     <Switch
//                       checked={notificationSettings.productUpdates}
//                       onCheckedChange={() =>
//                         handleNotificationToggle("productUpdates")
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t">
//                   <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
//                     Notification Channels
//                   </h3>
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                     <div className="space-y-2">
//                       <Label htmlFor="email-frequency">Email Frequency</Label>
//                       <Select defaultValue="immediate">
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select frequency" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="immediate">Immediate</SelectItem>
//                           <SelectItem value="daily">Daily Digest</SelectItem>
//                           <SelectItem value="weekly">Weekly Digest</SelectItem>
//                           <SelectItem value="none">
//                             Don't send emails
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="push-notifications">
//                         Push Notifications
//                       </Label>
//                       <Select defaultValue="important">
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select notification type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="all">All Notifications</SelectItem>
//                           <SelectItem value="important">
//                             Important Only
//                           </SelectItem>
//                           <SelectItem value="none">None</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button onClick={handleSaveNotifications}>
//                   <Save className="w-4 h-4 mr-2" />
//                   Save Preferences
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>

//           {/* Security */}
//           <TabsContent value="security">
//             <Card className="dark:bg-[#131920]">
//               <CardHeader>
//                 <CardTitle>Security Settings</CardTitle>
//                 <CardDescription>
//                   Manage your account security preferences
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                         Two-Factor Authentication
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Add an extra layer of security to your account
//                       </p>
//                     </div>
//                     <Switch
//                       checked={securitySettings.twoFactorEnabled}
//                       onCheckedChange={() =>
//                         handleSecurityToggle("twoFactorEnabled")
//                       }
//                     />
//                   </div>

//                   {securitySettings.twoFactorEnabled && (
//                     <div className="ml-8 mt-2">
//                       <Button variant="outline" size="sm">
//                         Set Up Two-Factor
//                       </Button>
//                     </div>
//                   )}

//                   <Separator />

//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                         Login Notifications
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Get alerted when someone logs into your account
//                       </p>
//                     </div>
//                     <Switch
//                       checked={securitySettings.loginAlerts}
//                       onCheckedChange={() =>
//                         handleSecurityToggle("loginAlerts")
//                       }
//                     />
//                   </div>

//                   <Separator />

//                   <div className="space-y-2">
//                     <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                       Devices & Sessions
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Manage or log out of your active sessions
//                     </p>
//                     <div className="mt-2">
//                       <Button variant="outline" size="sm">
//                         Manage Sessions
//                       </Button>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="space-y-2">
//                     <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
//                       Account Data
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Download or delete your account data
//                     </p>
//                     <div className="mt-2 flex flex-wrap gap-3">
//                       <Button variant="outline" size="sm">
//                         Download Data
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/50 dark:hover:text-red-400">
//                         Delete Account
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t">
//                   <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
//                     Login History
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
//                       <div className="flex justify-between mb-2">
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                             Current Session
//                           </h4>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             Feb 28, 2025 at 10:45 AM
//                           </p>
//                         </div>
//                         <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
//                           Active
//                         </Badge>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                         <Globe className="w-3 h-3" />
//                         <span>San Francisco, CA — 192.168.1.1</span>
//                       </div>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
//                       <div className="flex justify-between mb-2">
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                             Previous Login
//                           </h4>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             Feb 27, 2025 at 3:20 PM
//                           </p>
//                         </div>
//                         <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">
//                           Ended
//                         </Badge>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                         <Globe className="w-3 h-3" />
//                         <span>San Francisco, CA — 192.168.1.1</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button onClick={handleSaveSecurity}>
//                   <Save className="w-4 h-4 mr-2" />
//                   Save Settings
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Settings;
