import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const Todo = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "todo",
    item: { type: "todo", ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-red-200 text-black mt-2 py-4 px-2 rounded-md shadow border border-accent border-opacity-10  hover:border-opacity-100 transition-all duration-100 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h2 className="text-lg">{item?.description}</h2>
    </div>
  );
};

Todo.propTypes = {
  item: PropTypes.object,
};

export default Todo;
