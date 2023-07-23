import React from 'react'
import SquatIcon from "../icons/SquatIcon";
import BenchIcon from "../icons/BenchIcon";
import LungeIcon from "../icons/LungeIcon";
import ETCIcon from "../icons/ETCIcon";
import RunIcon from '../icons/RunIcon';

const exerciseMenu = [
  {
    string: "squat",
    icon: <SquatIcon />,
  },
  {
    string: "lunge",
    icon: <LungeIcon />,
  },
  {
    string: "bench",
    icon: <BenchIcon />,
  },
  {
    string: "running",
    icon: <RunIcon />,
  },
  {
    string: "etc",
    icon: <ETCIcon />,
  }
]

function ChoiceExerciseMenu({ onClick, exercise }: { onClick: (string: string) => void, exercise: string}) {
  return (
    <article className="flex items-center justify-center cursor-pointer">
      <ul className="flex gap-4 mt-4">
        {exerciseMenu.map((item) => (
          <div className={`${exercise === item.string ? 'bg-black': ''} p-1 rounded-full`}>
            <li 
              onClick={() => onClick(item.string)}
              key={item.string} 
              className={`bg-white rounded-full overflow-hidden`}
            >
              {item.icon}
            </li>
          </div>
        ))}
      </ul>
    </article>
  )
}

export default ChoiceExerciseMenu