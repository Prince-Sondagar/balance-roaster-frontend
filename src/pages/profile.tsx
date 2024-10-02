import Layout from "../layout";
// @ts-ignore
import Profileimg from "../assets/images/profile.jpg";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { User, UserState } from "../store/reducers/user.reducer";
import { updateUserAction } from "../store/actions/user.action";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const { user } = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const { firstname, lastname, email }: any = user;
    setProfileData({
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
    });
  }, [user]);

  const profileDataChangeHandler = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setProfileData({ ...profileData, [name]: value });
  };

  const updateUserHandle = () => {
    console.log("profileData", profileData);
    dispatch<any>(updateUserAction(profileData));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto lg:px-8 md:px-6 px-4 py-6">
        <h2 className="text-gray-700 xsm:text-3xl text-2xl font-bold xsm:pb-7 pb-5">
          Profile
        </h2>
        <div className="bg-white shadow-xl rounded-lg xsm:p-6 p-4 mb-6 flex justify-center">
          <div className="relative xsm:w-[150px] w-[100px]">
            <img
              src={Profileimg}
              alt="BusinessLogo"
              className="xsm:h-[150px] xsm:w-[150px] h-[100px] w-[100px] rounded-full border-4 border-white relative object-cover"
            />
            <button className="absolute xsm:right-2.5 xsm:bottom-2 right-1.5 bottom-1.5 xsm:p-1.5 p-1 bg-primary rounded-full">
              <CameraIcon className="xsm:h-4 h-3 xsm:w-4 w-3 text-white " />
            </button>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg xsm:p-6 p-4 mb-6">
          <h2 className="text-gray-700 text-xl font-semibold xsm:pb-7 pb-5">
            User Info
          </h2>
          <div className="flex xsm:flex-row flex-col justify-between items-center mb-5">
            <h6 className="text-sm font-medium mb-1 text-secondary xsm:w-40 w-full">
              First Name
            </h6>
            <input
              value={profileData.firstname}
              onChange={({ target: { name, value } }) =>
                profileDataChangeHandler({ name, value })
              }
              name="firstname"
              type="text"
              placeholder="First Name"
              className="p-2.5 border border-light-gray rounded outline-none focus:border-primary mb-2 text-secondary placeholder:text-secondary/40 w-full xsm:w-[calc(100%-160px)] bg-white"
            />
          </div>
          <div className="flex xsm:flex-row flex-col justify-between items-center mb-5">
            <h6 className="text-sm font-medium mb-1 text-secondary xsm:w-40 w-full">
              Last Name
            </h6>
            <input
              value={profileData.lastname}
              type="text"
              placeholder="Last Name"
              className="p-2.5 border border-light-gray rounded outline-none focus:border-primary mb-2 text-secondary placeholder:text-secondary/40 w-full xsm:w-[calc(100%-160px)] bg-white"
            />
          </div>
          <div className="flex xsm:flex-row flex-col justify-between items-center">
            <h6 className="text-sm font-medium mb-1 text-secondary xsm:w-40 w-full">
              Email
            </h6>
            <input
              value={profileData.email}
              type="email"
              placeholder="Email"
              className="p-2.5 border border-light-gray rounded outline-none focus:border-primary mb-2 text-secondary placeholder:text-secondary/40 w-full xsm:w-[calc(100%-160px)] bg-white"
            />
          </div>
        </div>
        <div className="text-end">
          <button
            className="text-white py-1.5 bg-primary rounded-md px-8 text-lg font-bold border-2 border-primary hover:bg-white hover:text-primary transtion duration-500"
            onClick={() => updateUserHandle()}
          >
            Update
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
