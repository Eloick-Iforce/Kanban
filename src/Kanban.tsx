import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

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
  cards: any[];
  column: string;
  setCards: React.Dispatch<React.SetStateAction<any[]>>;
}

const Board = () => {
  const [tasks, setTasks] = React.useState(DEFAULT_TASKS);
  return (
    <div className="flex h-full justify-center w-full gap-16 overflow-scroll p-12">
      <Column
        title="À faire"
        headingColor="text-[#F25757]"
        column="todo"
        cards={tasks}
        setCards={setTasks}
      />
      <Column
        title="En cours"
        headingColor="text-[#FFBA08]"
        column="inprogress"
        cards={tasks}
        setCards={setTasks}
      />
      <Column
        title="Terminé"
        headingColor="text-[#8DB580]"
        column="done"
        cards={tasks}
        setCards={setTasks}
      />
      <BurnBarrel setCards={setTasks} />
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = React.useState(false);
  const filteredCards = cards.filter((card) => card.column === column);
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium text-3xl ${headingColor}`}>{title}</h3>
        <span className="rounded text-lg text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-300" : "bg-[#f2f2f2]"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ title, column, id }: any) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />

      <div
        draggable="true"
        className="cursor-grab rounded border border-neutral-200 active:cusor-grabbing p-3 bg-white shadow"
      >
        <p>{title}</p>
      </div>
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

const BurnBarrel = ({ setCards }: any) => {
  const [active, setActive] = React.useState(false);

  return (
    <div
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active ? "bg-[#F25757]/20 text-red-500" : "bg-[#f2f2f2]"
      } text-gray-500 hover:bg-[#F25757]/20 hover:text-red-500 cursor-pointer`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }: any) => {
  const [text, setText] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!text.trim().length) return;
    const newCard = {
      id: Math.random().toString(),
      title: text,
      column,
    };

    setCards((prev: any) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
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
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <span>Ajouter une tache</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};
