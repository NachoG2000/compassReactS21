import React from "react"
import { Link, Outlet } from "react-router-dom"

export default function UnprotectedHeaderLayout() {
  return (
    <>
        <header className="flex items-center justify-between px-4 py-3 bg-white">
            <Link className="flex items-center space-x-2" to={""}>
                <img className="h-14 w-14 mt-2 mb-2 md:mb-8" src="/s21logo.png"/>
            </Link>
        </header>
        <Outlet />
    </>
  )
}
