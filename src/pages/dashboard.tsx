import Layout from "../layout";
import { DocumentTextIcon, NewspaperIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto lg:px-8 md:px-6 px-4 py-6">
        <h2 className="text-gray-700 xsm:text-3xl text-2xl font-bold xsm:pb-7 pb-5">
          Dashboard
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 items-center">
          <div className="rounded-lg p-6 shadow-1xl border flex gap-4 items-center bg-white">
            <div className="bg-primary/70 text-white rounded h-10 w-10 flex items-center justify-center"><DocumentTextIcon className='h-7 w-7' /></div>
            <div>
              <h4 className="capitalize font-medium text-2xl text-secondary">100</h4>
              <h4 className="capitalize font-medium text-secondary/80">total uploaded Documents</h4>
            </div>
          </div>
          <div className="rounded-lg p-6 shadow-1xl border flex gap-4 items-center bg-white">
            <div className="bg-primary/70 text-white rounded h-10 w-10 flex items-center justify-center"><NewspaperIcon className='h-7 w-7' /></div>
            <div>
              <h4 className="capitalize font-medium text-2xl text-secondary">1000</h4>
              <h4 className="capitalize font-medium text-secondary/80">total generated a report</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Dashboard.defaultProps = {};

export default Dashboard;