import React from "react"; // we need this to make JSX compile

type CharBoxProps = {
  char: string; // can be null
  status?: number;
};

const boxStatusClass = (status: number) => {
  if (status === 0)
    return "bg-gray-400";
  else if (status === 1)
    return "bg-yellow-500";
  else if (status === 2)
    return "bg-green-500";
  else 
    return "bg-black"
}

export const CharBox = ({ char, status }: CharBoxProps) => (<>
    <div className={`table ${boxStatusClass(status)} h-16 w-16 lg:h-24 lg:w-24 border-2 border-indigo-500 rounded-lg`}>
      <p className="text-5xl lg:text-7xl text-center table-cell align-middle">{char}</p>
    </div>
  </>
);
