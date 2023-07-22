import React from 'react'
import SquatIcon from "../icons/SquatIcon";
import BenchIcon from "../icons/BenchIcon";
import RungeIcon from "../icons/RungeIcon";
import RunningIcon from "../icons/RunningIcon";
import ETCIcon from "../icons/ETCIcon";

const workMenu = [
  {
    href: "/?work=squat",
    icon: <SquatIcon />,
  },
  {
    href: "/?work=runge",
    icon: <RungeIcon />,
  },
  {
    href: "/?work=bench",
    icon: <BenchIcon />,
  },
  {
    href: "/?work=running",
    icon: <RunningIcon />,
  },
  {
    href: "/?work=etc",
    icon: <ETCIcon />,
  }
]

function WorkMenu() {
  return (
    <article className="flex items-center justify-center">
      <ul className="flex gap-4 mt-4">
        {workMenu.map((item) => (
          <li key={item.href}>
            <a href={item.href}>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default WorkMenu