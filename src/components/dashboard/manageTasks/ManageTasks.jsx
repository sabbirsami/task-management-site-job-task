import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { BsStopwatchFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { useEffect, useState } from "react";

const ManageTasks = () => {
    const { data: tasks, isLoading } = useQuery({
        queryKey: "tasks",
        queryFn: () =>
            fetch("http://localhost:5000/tasks")
                .then((res) => res.json())
                .then((data) => data),
    });
    const [tasksState, setTasks] = useState(tasks || []);
    useEffect(() => {
        console.log(tasks);
    }, [tasks]);
    const updateTaskStatus = (taskId, newStatus) => {
        // Update the backend API with the new status
        // ...

        // Update local state
        const updatedTasks = tasksState.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside the list

        const { source, destination, draggableId } = result;

        if (source.droppableId === destination.droppableId) return; // Same list

        // Perform status update based on destination
        let newStatus;
        switch (destination.droppableId) {
            case "to-do":
                newStatus = "to-do";
                break;
            case "ongoing":
                newStatus = "ongoing";
                break;
            case "complete":
                newStatus = "complete";
                break;
            default:
                break;
        }

        updateTaskStatus(draggableId, newStatus);
    };

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    console.log(tasks);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className="text-white p-6 w-full">
                {/* header section  */}
                <div className="flex justify-between items-end border-b pb-6 border-white/50">
                    <div className="">
                        <h6 className="font-medium">TaskTo tasks board</h6>
                        <p className="opacity-70 font-light text-sm">
                            Create and complete and manage your tasks using
                            TaskTo task board.
                        </p>
                    </div>
                    <div className="">
                        <Link to={"/management/add-task"}>
                            <button className="bg-white text-black text-sm px-5 py-3 rounded-md font-bold">
                                <BsStopwatchFill className="inline mb-1 me-2 text-xl" />{" "}
                                Add Task
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6  mt-6">
                    <Droppable droppableId="to-do">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md">
                                    <LuListTodo className="text-2xl" />{" "}
                                    <h2 className="">To Do Tasks</h2>
                                </div>
                                <div className="mt-8">
                                    {tasks.map(
                                        (task, index) =>
                                            task.status === "to-do" && (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                    )}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="ongoing">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md">
                                    <MdOutlineCallMissedOutgoing className="text-2xl" />{" "}
                                    <h2 className="">Ongoing Tasks</h2>
                                </div>
                                <div className="mt-8">
                                    {tasks.map(
                                        (task, index) =>
                                            task.status === "ongoing" && (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                    )}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="complete">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="bg-[#1E2530] px-6 py-4 flex items-center gap-4 rounded-md">
                                    <MdOutlineFileDownloadDone className="text-2xl" />{" "}
                                    <h2 className="">Complete Tasks</h2>
                                </div>
                                <div className="mt-8">
                                    {tasks.map(
                                        (task, index) =>
                                            task.status === "complete" && (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                    )}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </section>
        </DragDropContext>
    );
};

export default ManageTasks;
