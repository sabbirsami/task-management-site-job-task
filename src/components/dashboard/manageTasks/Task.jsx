import PropTypes from "prop-types";
import { BsStopwatchFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";
import { Avatar, Button, Dropdown, Modal } from "flowbite-react";
import { BiSolidMessageSquare } from "react-icons/bi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";

const Task = ({ task, refetch, idx }) => {
    const [requiredError, setRequiredError] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const descriptionRef = useRef();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [dateErrorMessage, setDateErrorMessage] = useState("");
    // get today date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = String(today.getFullYear());
    today = `${yyyy}-${mm}-${dd}`;
    let speed = idx * 0.3;
    const deleteTask = (id) => {
        console.log(id);
        fetch(
            `https://task-management-server-cyan-omega.vercel.app/tasks/${id}`,
            {
                method: "DELETE",
            }
        )
            .then((rsc) => rsc.json())
            .then((result) => {
                console.log(result);
                toast.success("Successfully task deleted");
                refetch();
            });
    };
    const handleDeleteTask = () => {
        setOpenDeleteModal(true);
    };
    const onSubmit = (data) => {
        setButtonLoading(true);
        if (new Date(data.deadline) > new Date(today)) {
            const description = descriptionRef.current.value;
            if (!description) {
                return setRequiredError("Required *");
            }
            setRequiredError("");
            const taskData = {
                title: data.title,
                priority: data.priority,
                status: data.status,
                deadline: data.deadline,
                description: description,
            };
            fetch(
                `https://task-management-server-cyan-omega.vercel.app/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(taskData),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setButtonLoading(false);
                    reset();

                    toast.success("New Task Added");
                });
        } else {
            setButtonLoading(false);
            return setDateErrorMessage("Please provide a valid Date");
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + speed }}
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
                        <Modal
                            show={openModal}
                            size={"7xl"}
                            onClose={() => setOpenModal(false)}
                        >
                            <Modal.Header>Update Task</Modal.Header>
                            <Modal.Body>
                                <div className="xl:p-8 md:p-6 p-3 rounded-xl bg-white">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid ">
                                            <div className=" flex gap-6">
                                                <div className=" grow ">
                                                    <label
                                                        className="mt-3"
                                                        htmlFor="name"
                                                    >
                                                        Title{" "}
                                                        <span className="text-red-600">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("title", {
                                                            required: true,
                                                        })}
                                                        className="w-full rounded-md border-0 bg-gray-200 py-3 mt-2"
                                                        placeholder="Class name"
                                                    />
                                                    {/* error message */}
                                                    <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                                        {errors.title && (
                                                            <span>
                                                                Title is
                                                                required *
                                                            </span>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-3 xl:flex gap-6">
                                                <div className="mt-3 ">
                                                    <label
                                                        className="mt-3"
                                                        htmlFor="PriorityLevel"
                                                    >
                                                        Priority Level{" "}
                                                        <span className="text-red-600">
                                                            *
                                                        </span>
                                                    </label>

                                                    <select
                                                        className="w-full rounded-md border-0 bg-gray-200 py-3 mt-2"
                                                        {...register(
                                                            "priority",
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                        name="intensityLevel"
                                                        id="intensityLevel"
                                                    >
                                                        <option value="moderate">
                                                            Moderate
                                                        </option>
                                                        <option value="high ">
                                                            High
                                                        </option>
                                                        <option value="low ">
                                                            Low
                                                        </option>
                                                    </select>
                                                    {/* error message */}
                                                    <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                                        {errors.priority && (
                                                            <span>
                                                                Priority level
                                                                is required *
                                                            </span>
                                                        )}
                                                    </label>
                                                </div>
                                                <div className="mt-3 grow">
                                                    <label
                                                        className="mt-3"
                                                        htmlFor="statusLevel"
                                                    >
                                                        Status Level{" "}
                                                        <span className="text-red-600">
                                                            *
                                                        </span>
                                                    </label>

                                                    <select
                                                        className="w-full rounded-md border-0 bg-gray-200 py-3 mt-2"
                                                        {...register("status", {
                                                            required: true,
                                                        })}
                                                        name="status"
                                                        id="status"
                                                    >
                                                        <option value="to-do">
                                                            To Do
                                                        </option>
                                                        <option value="outgoing">
                                                            Ongoing
                                                        </option>
                                                        <option value="complete">
                                                            Complete
                                                        </option>
                                                    </select>
                                                    {/* error message */}
                                                    <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                                        {errors.status && (
                                                            <span>
                                                                intensity level
                                                                is required *
                                                            </span>
                                                        )}
                                                    </label>
                                                </div>
                                                <div className=" mt-3">
                                                    <label
                                                        htmlFor="buyerEmail"
                                                        className=" mt-6 font-bold text-sm "
                                                    >
                                                        Deadline
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register(
                                                            "deadline",
                                                            {
                                                                required: true,
                                                            }
                                                        )}
                                                        className="w-full rounded-md border-0 bg-gray-200 py-3 mt-2"
                                                        placeholder="Deadline"
                                                    />
                                                    {/* error message for deadline*/}
                                                    <label className="block md:w-64 w-full  text-sm text-[#d63031]">
                                                        {errors.deadline && (
                                                            <span>
                                                                Deadline is
                                                                required *
                                                            </span>
                                                        )}
                                                    </label>
                                                    <label className="block md:w-64 w-full  text-sm text-[#d63031]">
                                                        {dateErrorMessage}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <label
                                                    className="mt-3"
                                                    htmlFor="short_description"
                                                >
                                                    Short Description{" "}
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea
                                                    ref={descriptionRef}
                                                    name=""
                                                    className="w-full rounded-md border-0 bg-gray-200 py-3 mt-2"
                                                    placeholder="short description"
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                ></textarea>
                                                {/* error message */}
                                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                                    <span>{requiredError}</span>
                                                </label>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black w-full rounded-md py-3 mt-3"
                                            >
                                                {buttonLoading ? (
                                                    <div role="status">
                                                        <svg
                                                            aria-hidden="true"
                                                            className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-400"
                                                            viewBox="0 0 100 101"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">
                                                            Loading...
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>Update Task</span>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Dropdown.Item>
                            <button
                                onClick={() => setOpenModal(true)}
                                className="text-green-500 font-semibold"
                            >
                                Update
                            </button>
                        </Dropdown.Item>
                        <Modal
                            show={openDeleteModal}
                            size="md"
                            onClose={() => setOpenDeleteModal(false)}
                            popup
                        >
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this
                                        product?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button
                                            color="failure"
                                            onClick={() => deleteTask(task._id)}
                                        >
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button
                                            color="gray"
                                            onClick={() =>
                                                setOpenDeleteModal(false)
                                            }
                                        >
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Dropdown.Item>
                            {" "}
                            <button
                                className="text-red-500 font-semibold"
                                onClick={() => handleDeleteTask(task._id)}
                            >
                                Delete
                            </button>{" "}
                        </Dropdown.Item>
                    </Dropdown>
                </button>
            </div>
            <p className="text-xs opacity-65 pt-4">{task.description}</p>
            <div className="flex justify-between items-center">
                <p className="pt-3 flex items-center gap-2">
                    <BsStopwatchFill className="text-green-500" />{" "}
                    <span className="text-xs pt-0.5">
                        {task.deadline.split("T")[0]}
                    </span>
                </p>
                <p className="pt-3 flex items-center gap-2">
                    <span className="text-sm pt-0.5">{task.priority}</span>
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
                    <span className="text-xs pt-0.5">{task.title.length}</span>
                </p>
            </div>
        </motion.div>
    );
};

Task.propTypes = {
    task: PropTypes.object,
    idx: PropTypes.number,
    refetch: PropTypes.func,
};

export default Task;
