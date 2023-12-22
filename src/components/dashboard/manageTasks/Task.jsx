import PropTypes from "prop-types";
import { BsStopwatchFill } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";

const Task = ({ task }) => {
    return (
        <div className="mt-3 bg-[#1E2530] rounded-md p-6">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-xs opacity-65 pt-4">{task.description}</p>
            <div className="flex justify-between items-center">
                <p className="pt-3 flex items-center gap-4">
                    <BsStopwatchFill />{" "}
                    <span className="text-sm pt-0.5">
                        {task.deadline.split("T")[0]}
                    </span>
                </p>
                <p className="pt-3 flex items-center gap-4">
                    <MdDoubleArrow className="-rotate-90" />{" "}
                    <span className="text-sm pt-0.5">{task.priority}</span>
                </p>
            </div>
        </div>
    );
};

export default Task;

Task.propTypes = {
    task: PropTypes.object,
};
