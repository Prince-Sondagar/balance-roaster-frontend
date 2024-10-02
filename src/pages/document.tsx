import Spreadsheet from "react-spreadsheet";
import { Link } from "react-router-dom";
import Layout from "../layout";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const DocumentId = () => {
    
    let col = ["Student Full Name", "Student Key", "Other ID", "Gr", "CY Course", "CY Section", "CY Period", "CY Teacher Name", "CY Term", "CY Course Type", "CY Course Length"];
    let index
    const data = [
        [{ value: "Davidson, Jonah Ethan Buell" }, { value: "DAVIDJON000" }, { value: "121672" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Martinez, Perla Yazmin" }, { value: "MARTIPER000" }, { value: "300014" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Mendoza, Eirian Atzel" }, { value: "MENDOEIR000" }, { value: "310068" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Mercado, Giselle" }, { value: "MERCAGIS000" }, { value: "310155" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Miramontes, Bella Elizabeth" }, { value: "MIRAMBEL000" }, { value: "310051" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Moreno, Alexander Phillip" }, { value: "MORENALE003" }, { value: "310012" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Mulloy, Ayden Ace" }, { value: "MULLOAYD000" }, { value: "310123" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Puente, Jeremiah Jesus" }, { value: "PUENTJER000" }, { value: "123852" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Smith, Charley Peyton Love" }, { value: "SMITHCHA001" }, { value: "310198" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],
        [{ value: "Taylor-Gonzales, Sincere Eliza" }, { value: "TAYLOSIN000" }, { value: "310057" }, { value: "5" }, { value: "5 Sci" }, { value: "21" }, { value: "1" }, { value: "Bradley Brunson" }, { value: "y" }, { value: "5TH GR" }, { value: "YR = YEAR" }],


    ];

    return (
        <Layout>
            <div className="max-w-8xl mx-auto lg:px-8 md:px-6 px-4 py-6">
                <h2 className="text-gray-700 xsm:text-3xl text-2xl font-bold xsm:pb-7 pb-5 flex items-center gap-4">
                    <Link to="/document"><ChevronLeftIcon className="w-5 h-5" /></Link>L.P. Savani Internatinal School
                </h2>
                <div className="overflow-x-auto">
                    <Spreadsheet className="w-[1490px]" data={data} columnLabels={col} rowLabels={index} />
                </div>
            </div>
        </Layout>
    );
};

export default DocumentId;