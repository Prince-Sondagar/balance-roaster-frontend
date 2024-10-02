import Layout from "../layout";

const Security = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto lg:px-8 md:px-6 px-4 py-6">
        <h2 className="text-gray-700 xsm:text-3xl text-2xl font-bold xsm:pb-7 pb-5">
          Security
        </h2>
        <div className="flex xsm:flex-row flex-col justify-between items-center mb-5">
          <h6 className="text-sm font-medium mb-1 text-secondary xsm:w-40 w-full">
            Old Password
          </h6>
          <input
            type="password"
            placeholder="Old Password"
            className="p-2.5 border border-light-gray rounded outline-none focus:border-primary mb-2 text-secondary placeholder:text-secondary/40 w-full xsm:w-[calc(100%-160px)] bg-white"
          />
        </div>
        <div className="flex xsm:flex-row flex-col justify-between items-center mb-5">
          <h6 className="text-sm font-medium mb-1 text-secondary xsm:w-40 w-full">
            New Password
          </h6>
          <input
            type="password"
            placeholder="New Password"
            className="p-2.5 border border-light-gray rounded outline-none focus:border-primary mb-2 text-secondary placeholder:text-secondary/40 w-full xsm:w-[calc(100%-160px)] bg-white"
          />
        </div>
        <div className="flex xsm:flex-row flex-col justify-between items-center mb-5">
          <h6 className="text-sm font-medium mb-1 text-secondary xsm:w-40 w-full">
            Confirm Password
          </h6>
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2.5 border border-light-gray rounded outline-none focus:border-primary mb-2 text-secondary placeholder:text-secondary/40 w-full xsm:w-[calc(100%-160px)] bg-white"
          />
        </div>
        <div className="text-end xsm:pt-4 pt-3">
          <button className="text-white py-1.5 bg-primary rounded-md px-8 text-lg font-bold border-2 border-primary hover:bg-white hover:text-primary transtion duration-500">
            Update
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Security;