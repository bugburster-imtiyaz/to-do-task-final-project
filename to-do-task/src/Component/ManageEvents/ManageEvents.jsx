import { useContext, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Modal from "../Shared/Modal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [isModal, setIsModal] = useState(false);

  const {
    data: boards = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["boards", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/eventTask?email=${user?.email}`);
      return result?.data;
    },
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          onClick={() => setIsModal(!isModal)}
          className="w-full cursor-pointer rounded-[10px]  p-5 bg-white mt-6"
        >
          <div className="bg-[#fa782f66] h-[180px] rounded-[10px] grid place-items-center">
            <img
              src="https://github.com/PropPioneers1/event-planet/blob/main/client/src/assets/image/createProject-img.png?raw=true"
              alt=""
            />
          </div>
          <h3 className="font-semibold text-xl text-center pt-2.5">
            Create a new board
          </h3>
        </div>

        {/* displaying previous boards */}
        {boards?.map((board) => (
          <Link to={`/${board?._id}`} key={board?._id}>
            <div className="w-full cursor-pointer rounded-[10px]  p-5 bg-white mt-6">
              <div className="bg-[#fa782f66] h-[180px] rounded-[10px] grid place-items-center">
                <img
                  className="h-[180px] rounded-[10px] object-cover w-full"
                  src={board?.boardBgImg}
                  alt="Board Image"
                />
              </div>
              <h3 className="font-semibold text-xl text-center pt-2.5">
                {board?.boardName}
              </h3>
            </div>
          </Link>
        ))}

        {/* Modal For Create new Board */}
        <div
          className={`${isModal ? "block" : "hidden"} absolute top-0
           left-0  w-full min-h-full grid place-items-center`}
        >
          <Modal refetch={refetch} setIsModal={setIsModal} />
          <div
            onClick={() => setIsModal(false)}
            className="z-30  fixed top-0 left-0 h-screen w-full bg-[#000000b3]"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
