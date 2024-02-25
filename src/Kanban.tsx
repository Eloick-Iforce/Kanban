import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

export const Kanban = () => {
  return (
    <div className="h-screen w-full bg-[#f2f2f2]">
      <Board />
    </div>
  );
};

const DEFAULT_TASKS = [
  //todo
  { id: 1, title: "Faire le ménage", column: "todo" },
  { id: 2, title: "Faire les courses", column: "todo" },
  { id: 3, title: "Faire du sport", column: "todo" },

  //inprogress
  { id: 4, title: "Faire la cuisine", column: "inprogress" },
  { id: 5, title: "Faire du sport", column: "inprogress" },

  //done
  { id: 6, title: "Faire le ménage", column: "done" },
  { id: 7, title: "Faire les courses", column: "done" },
  { id: 8, title: "Faire du sport", column: "done" },
];

interface ColumnProps {
  title: string;
  headingColor: string;
  tasks: any[];
  column: string;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const Board = () => {
  const [tasks, setTasks] = React.useState(DEFAULT_TASKS);
  return (
    <div className="flex h-full justify-center w-full gap-16 overflow-scroll p-12">
      <Column
        title="À faire"
        headingColor="text-[#F25757]"
        column="todo"
        tasks={tasks}
        setTasks={setTasks}
      />
      <Column
        title="En cours"
        headingColor="text-[#FFBA08]"
        column="inprogress"
        tasks={tasks}
        setTasks={setTasks}
      />
      <Column
        title="Terminé"
        headingColor="text-[#8DB580]"
        column="done"
        tasks={tasks}
        setTasks={setTasks}
      />
      <BurnBarrel setTasks={setTasks} />
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  tasks,
  column,
  setTasks,
}: ColumnProps) => {
  const [active, setActive] = React.useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: any) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const filteredTasks = tasks.filter((task) => task.column === column);
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium text-3xl ${headingColor}`}>{title}</h3>
        <span className="rounded text-lg text-neutral-400">
          {filteredTasks.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-300" : "bg-[#f2f2f2]"
        }`}
      >
        {filteredTasks.map((task) => (
          <Task key={task.id} {...task} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        <AddTask column={column} setTasks={setTasks} />
      </div>
    </div>
  );
};

const Task = ({ title, column, id, handleDragStart }: any) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />

      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { id, title, column })}
        className="cursor-grab rounded border border-neutral-200 active:cusor-grabbing p-3 bg-white shadow"
      >
        <p>{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }: any) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-pink-300 opacity-0"
    ></div>
  );
};

const BurnBarrel = ({ setTasks }: any) => {
  const [active, setActive] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("taskId");
    console.log(taskId);

    setTasks((prev: any) => prev.filter((c: any) => c.id !== taskId));

    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active ? "bg-[#F25757]/20 text-red-500" : "bg-[#f2f2f2]"
      } text-gray-500 hover:bg-[#F25757]/20 hover:text-red-500 cursor-pointer`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddTask = ({ column, setTasks }: any) => {
  const [text, setText] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!text.trim().length) return;
    const newTask = {
      id: Math.random().toString(),
      title: text,
      column,
    };

    setTasks((prev: any) => [...prev, newTask]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Ajouter une tache"
            className="w-full rounded border border-violet-200 bg-violet-400/20 p-3 text-sm text-neutral-800 placeholder:text-violet-600 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="text-neutral-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              <span>Ajouter</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <span>Ajouter une tache</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
