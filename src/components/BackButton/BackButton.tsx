import { useNavigate } from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import { IoArrowUndoSharp } from "react-icons/io5";

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(-1)}>
            <IoArrowUndoSharp /> Retour
        </Button>
    );
};
