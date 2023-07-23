import React from 'react'
import SquatIcon from "../icons/SquatIcon";
import BenchIcon from "../icons/BenchIcon";
import LungeIcon from "../icons/LungeIcon";
import ETCIcon from "../icons/ETCIcon";
import RunIcon from '../icons/RunIcon';

const exerciseMenu = [
  {
    href: "/?exercise=squat",
    icon: <SquatIcon />,
  },
  {
    href: "/?exercise=lunge",
    icon: <LungeIcon />,
  },
  {
    href: "/?exercise=bench",
    icon: <BenchIcon />,
  },
  {
    href: "/?exercise=running",
    icon: <RunIcon />,
  },
  {
    href: "/?exercise=etc",
    icon: <ETCIcon />,
  }
]

function ExerciseMenu() {
  return (
    <article className="flex items-center justify-center">
      <ul className="flex gap-4 mt-4">
        {exerciseMenu.map((item) => (
          <li key={item.href} className='border border-gray-200 rounded-full overflow-hidden '>
            <a href={item.href}>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ExerciseMenu