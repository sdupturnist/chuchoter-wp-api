import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";
import { CategoryData } from "@/hooks/categoryData";
import { SubCategoryData } from "@/hooks/subCategoryData";
import Link from "next/link";




export default function PageHeader({ title, type, data, initialData, mainCat }) {







    const { themeLayout } = useThemeContext();
    const { setModalFor, setShowModal } = useModalContext();



    const currentTheme = themeLayout.toString().toLowerCase()








    const openFilterModal = () => {
        setShowModal(true);
        setModalFor('filter');
    };




    let color;
    switch (currentTheme) {
        case "white":
            color = "white";
            break;
        case 'chocolates':
            color = "#c89a3f";
            break;
        case 'flowers':
            color = "#E62263";
            break;
        case 'cakes':
            color = "#E79F02";
            break;
        case 'events':
            color = "#258F89";
            break;
        default:
            color = "#c89a3f";
            break;
    }



    let pageHeaderType;

    switch (type) {
        case 'cat':

        
    const FilteredCategories = (color) => {

        const allSubCategories = data
            .flatMap(item => item.acf.sub_categories)
            .filter((subCategory, index, self) =>
                index === self.findIndex(s => s.ID === subCategory.ID)
            );


        return (

            allSubCategories.map(sub => (
                <>
                    {sub.post_title && <Link
                        key={sub.ID}
                        aria-label={sub.post_title}
                        title={sub.post_title}
                        className={`btn bg-transparent  hover:border-${color}-100 text-${color}-100  border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}
                        href={`/${mainCat.toLowerCase()}?sub_categories=${sub.post_title?.toLowerCase()}`}
                    >
                        {sub.post_title}
                    </Link>}
                </>
            ))
        )

    };


    const checkIfHaveSubCat = FilteredCategories()[0]?.props?.children?.props?.title


    const FilteredCategoriesMore = (color) => {


        const allSubCategories = data
            .flatMap(item => item.acf.sub_categories)
            .filter((subCategory, index, self) =>
                index === self.findIndex(s => s.ID === subCategory.ID)
            );

        return (

            allSubCategories.map(sub => (
                <>
                    {sub.post_title && <li key={sub.ID} className="!block">
                        <Link
                            aria-label={sub.post_title}
                            title={sub.post_title}
                            className={`w-full px-[15px] hover:border-${color}-100 rounded-none hover:bg-transparent text-${color}-100 btn bg-transparent border-0 hover:border-gray-300 !capitalize !font-regular !text-[13px]`}
                            href={`/${mainCat.toLowerCase()}?sub_categories=${sub.post_title?.toLowerCase()}`}
                        >
                            {sub.post_title}
                        </Link>
                    </li>}

                </>
            ))
        )


    };



    
            pageHeaderType = (


                

                <div className="xl:flex  justify-between xl:items-end gap-[30px] w-full">
                    <div className="xl:w-[50%] hidden lg:block">
                        <h1 className={`font-primary first-letter:uppercase text-[40px] text-${currentTheme}-100`}>{title}</h1>
                        <p className={`text-${currentTheme}-100`}>Explore our Exquisite Collection</p>
                    </div>
                    <div className="flex xl:w-[50%] gap-[6px] w-full mt-[20px] xl:mt-[0]">
                        <div className="flex gap-[6px] w-full xl:justify-end">

                            {checkIfHaveSubCat &&
                                <>
                             
                                    <Link
                                        aria-label={title.replace(/-/g, ' ')}
                                        className={`btn bg-transparent  hover:border-${currentTheme}-100 text-${currentTheme}-100  border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}
                                        title={title.replace(/-/g, ' ')}
                                        href={`/${mainCat.replace(/ /g, '-').toLowerCase()}`}>
                                        all
                                    </Link>
                                    <div className="sm:flex hidden gap-2">
                                        {FilteredCategories(currentTheme)}
                                    </div>
                                    <div className="dropdown dropdown-hover sm:dropdown-end dropdown-start  rounded-[6px] hover:bg-transparent !">
                                        <div tabIndex={0} role="button" className={`btn px-[20px] bg-transparent hover:border-${currentTheme}-100 text-${themeLayout}-100   border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] px-[10px]`}>
                                            <span className={`text-${currentTheme}-100 sm:hidden`}> Categories</span>
                                            <span className={`text-${currentTheme}-100  hidden sm:block`}> View all</span>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100  z-[1] w-52 p-0 shadow overflow-hidden rounded-[6px] m-0">
                                            {FilteredCategoriesMore(currentTheme)}
                                        </ul>
                                    </div>
                                    {FilteredCategories().length > 3 && <div className="dropdown dropdown-hover dropdown-end  rounded-[6px]">
                                        <div tabIndex={0} role="button" className={`btn hover:border-${currentTheme}-100 bg-transparent border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] px-[10px]`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="32" fill={currentTheme} viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path></svg>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100  z-[1] w-52 p-0 shadow overflow-hidden rounded-[6px]">
                                            {FilteredCategoriesMore(currentTheme)}
                                        </ul>
                                    </div>
                                    }
                                </>
                            }





                        </div>
                        <button onClick={openFilterModal} className={`btn bg-transparent border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] hover:border-${currentTheme}-100`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="none" viewBox="0 0 19 16">
                                <path fill={color} stroke={color} strokeWidth=".4" d="M1.125 4.236H4.36a2.825 2.825 0 0 0 5.53 0h7.735a.575.575 0 1 0 0-1.15H9.89a2.825 2.825 0 0 0-5.53 0H1.125a.575.575 0 1 0 0 1.15Zm6-2.25a1.675 1.675 0 1 1 0 3.35 1.675 1.675 0 0 1 0-3.35Zm10.5 10.1H15.89a2.825 2.825 0 0 0-5.53 0H1.125a.575.575 0 1 0 0 1.15h9.235a2.825 2.825 0 0 0 5.53 0h1.735a.575.575 0 0 0 0-1.15Zm-4.5 2.25a1.676 1.676 0 1 1 0-3.35 1.676 1.676 0 0 1 0 3.35Z" />
                            </svg>

                        </button>
                    </div>
                </div>
            );
            break;

        default:
            pageHeaderType = (
                <div className="text-center sm:[&>h1]:text-[30px] [&>h1]:text-[20px] [&>h1]:font-semibold [&>h1]:uppercase sm:py-[50px] py-[20px]">
                    <h1>{title}</h1>
                </div>
            );
            break;
    }

    return pageHeaderType;
}
