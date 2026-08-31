import { useNavigate } from "react-router-dom";
import { ProjectCategory } from "../Models/Project";

type CategoryLinkProps = {
    category: ProjectCategory;
    title: string;
    onSelectCategory: (category: ProjectCategory) => void;
};

export default function CategoryLink({ category, title, onSelectCategory }: CategoryLinkProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        onSelectCategory(category);
        navigate('/projets');
    };

    return (
        <button
            className="dark_outline"
            onClick={handleClick}
        >
            {title}
        </button>
    );
}

