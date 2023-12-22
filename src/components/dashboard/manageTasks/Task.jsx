import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { BsStopwatchFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";
import { Avatar, Dropdown } from "flowbite-react";
import { BiSolidMessageSquare } from "react-icons/bi";

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mt-3 bg-[#1E2530] rounded-md p-6"
                >
                    <div className=" flex items-center gap-2 justify-between">
                        <h2 className="font-semibold text-lg">{task.title}</h2>
                        <button className="col-span-1">
                            <Dropdown
                                className="right-0"
                                label=""
                                dismissOnClick={false}
                                renderTrigger={() => (
                                    <span>
                                        <BsThreeDotsVertical />
                                    </span>
                                )}
                            >
                                <Dropdown.Item>Update</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown>
                        </button>
                    </div>
                    <p className="text-xs opacity-65 pt-4">
                        {task.description}
                    </p>
                    <div className="flex justify-between items-center">
                        <p className="pt-3 flex items-center gap-2">
                            <BsStopwatchFill className="text-green-500" />{" "}
                            <span className="text-xs pt-0.5">
                                {task.deadline.split("T")[0]}
                            </span>
                        </p>
                        <p className="pt-3 flex items-center gap-2">
                            <span className="text-sm pt-0.5">
                                {task.priority}
                            </span>
                            <MdDoubleArrow className="-rotate-90 text-red-500" />{" "}
                        </p>
                    </div>
                    <hr className="mt-5 opacity-15" />
                    <div className="flex items-center justify-between mt-6">
                        <div className="">
                            <Avatar.Group>
                                <Avatar
                                    img="https://i.ibb.co/306Jc8L/trainer.png"
                                    rounded
                                    size="xs"
                                    stacked
                                />
                                <Avatar
                                    img="https://i.ibb.co/p3JDgZ9/profile.jpg"
                                    rounded
                                    size="xs"
                                    stacked
                                />
                                <Avatar
                                    img="https://i.ibb.co/Fsmx5PF/IMG-4839.jpg"
                                    rounded
                                    size="xs"
                                    stacked
                                />
                            </Avatar.Group>
                        </div>
                        <p className="flex items-center gap-2">
                            <BiSolidMessageSquare className="" />{" "}
                            <span className="text-xs pt-0.5">
                                {task.title.length}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

Task.propTypes = {
    task: PropTypes.object,
    index: PropTypes.number,
};

export default Task;
