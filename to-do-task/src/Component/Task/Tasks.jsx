import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { useDrop } from "react-dnd";
import Todo from "../Shared/Todo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tasks = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [isCard, setIsCard] = useState(false);

  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  // fetching single board
  const { data: board = {}, isPending } = useQuery({
    queryKey: ["board"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/eventTask/${id}`);
      return result?.data;
    },
  });

  // fetching all toDos
  const { data: allTodo = [], refetch } = useQuery({
    queryKey: ["AllTodo"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/eventTodo/${id}`);
      return result?.data;
    },
  });

  // set todo based on status
  useEffect(() => {
    // Check if allTodo is not an empty array and has changed
    if (
      allTodo?.length > 0 &&
      JSON.stringify(allTodo) !== JSON.stringify(todo)
    ) {
      const filteredTodo = allTodo?.filter((item) => item.status === "todo");
      const filteredProgress = allTodo?.filter(
        (item) => item.status === "progress"
      );
      const filteredCompleted = allTodo?.filter(
        (item) => item.status === "completed"
      );
      setTodo(filteredTodo);
      setProgress(filteredProgress);
      setCompleted(filteredCompleted);
    }
  }, [allTodo]);

  // Adding new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const description = e.target.todo.value;
    const newTodo = {
      description,
      date: new Date(),
      boardId: id,
      status: "todo",
    };

    console.log(newTodo, "<=============");

    const result = await axiosSecure.post(`/eventTodo`, newTodo);
    if (result) {
      toast.success("Todo Added Successfully");
      refetch();
      setIsCard(false);
    }
  };

  // Updating status of todo after drop
  const handleDrop = async (item, targetStatus) => {
    try {
      const updatedItem = { ...item, status: targetStatus };
      await axiosSecure.put(`/eventTodo/${item._id}`, updatedItem);
      refetch();
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  // For dropping todo
  const [, dropTodo] = useDrop({
    accept: "todo",
    drop: (item) => handleDrop(item, "todo"),
  });

  const [, dropProgress] = useDrop({
    accept: "todo",
    drop: (item) => handleDrop(item, "progress"),
  });

  const [, dropCompleted] = useDrop({
    accept: "todo",
    drop: (item) => handleDrop(item, "completed"),
  });

  if (isPending) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="bg-red-200 min-h-screen p-4 text-[#574d4d]">
      <h2 className="text-3xl md:text-5xl font-semibold text-center bg-green-200 mb-8 py-4">
        {" "}
        {board?.boardName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
        {/* todo */}
        <div ref={dropTodo} className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold text-center">Todo</h2>
          {/* Showing toDos */}
          <div className="mt-6">
            {todo?.map((item) => (
              <Todo key={item?._id} item={item} />
            ))}
          </div>

          {/* Adding new Todo */}
          {isCard ? (
            <div className="mt-6">
              <form onSubmit={handleAddTodo}>
                <textarea
                  placeholder="Add Todo"
                  name="todo"
                  className="textarea resize-none textarea-bordered min-h-[36px]  h-auto w-full focus:outline-none"
                ></textarea>
                <div className="flex items-center gap-2">
                  {/* Add card button: this button will post todo */}
                  <button
                    className=" px-3 py-1 rounded-md bg-accent text-white text-lg"
                    type="submit"
                  >
                    Add card
                  </button>
                  {/* Cancel Button */}
                  <button onClick={() => setIsCard(false)} className="btn">
                    <RxCross2 className="text-2xl" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // this div for opening todo creation input
            <div
              onClick={() => setIsCard(true)}
              className="flex items-center gap-2 mt-6 cursor-pointer rounded-md py-2 hover:bg-gray-300"
            >
              <GoPlus size={24} />
              <h3 className="text-lg font-semibold">Add a card</h3>
            </div>
          )}
        </div>
        {/* progress */}
        <div ref={dropProgress} className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold text-center">Progress</h2>
          {/* Showing Progress toDos */}
          <div className="mt-6">
            {progress?.map((item) => (
              <Todo key={item?._id} item={item} />
            ))}
          </div>
        </div>
        {/* completed */}
        <div ref={dropCompleted} className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold text-center">Completed</h2>
          {/* Showing completed toDos */}
          <div className="mt-6">
            {completed?.map((item) => (
              <Todo key={item?._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
