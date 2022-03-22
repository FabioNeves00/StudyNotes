import { signIn, signOut, useSession } from "next-auth/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import ClassIcon from "@mui/icons-material/Class";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Fragment } from "react";
import Link from "next/link";
import { NextPage } from "next";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  backButton?: boolean;
  backPage: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: NextPage<LayoutProps> = ({
  children,
  backButton,
  backPage,
}: LayoutProps) => {
  const { data: session } = useSession();
  return (
    <>
      <Disclosure
        as="nav"
        className="shadow-lg shadow-black bg-bg-secondary z-50"
      >
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center gap-2">
                  {backButton && (
                    <Link href={backPage}>
                      <a
                        href={backPage}
                        className="text-white text-4xl no-underline m-0 text-center mb-2"
                      >
                        <ArrowBackIosNewIcon
                          className="text-white"
                          fontSize="large"
                        />
                      </a>
                    </Link>
                  )}
                  <Link href="/">
                    <a
                      href="/"
                      className="text-white text-4xl font-bold no-underline m-0 "
                    >
                      <ClassIcon
                        className="text-white"
                        sx={{ fontSize: 50 }}
                        fontSize="large"
                      />
                      StudyNotes
                    </a>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu
                  as="div"
                  className="relative ml-3 drop-shadow-lg shadow-black"
                >
                  <div>
                    <Menu.Button className="flex rounded-2xl bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-16 rounded-3xl border-2 border-white hover:brightness-90"
                        src={
                          session?.user?.image ||
                          "https://scontent.fbel1-1.fna.fbcdn.net/v/t1.18169-9/s526x395/17796836_1150382925090762_736476295883560996_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=UIgzJCgMlNwAX_L6fSJ&_nc_ht=scontent.fbel1-1.fna&oh=00_AT_6sWwGuTZlMQlKaFiZ58-xcrq2rsNskohVOWRocH-pDg&oe=6222C38F"
                        }
                        alt={session?.user?.name || "Anonymous User"}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {session && (
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              <h1
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Logged as: {session.user?.name}
                              </h1>
                              <Link href="/notes">
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 no-underline"
                                  )}
                                >
                                  My notes
                                </a>
                              </Link>
                            </>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) =>
                          session ? (
                            <Link href="/">
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 no-underline"
                                )}
                                onClick={(e) => {
                                  signOut();
                                }}
                              >
                                Sign out
                              </a>
                            </Link>
                          ) : (
                            <Link href="/notes">
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 no-underline"
                                )}
                                onClick={(e) => {
                                  signIn();
                                }}
                              >
                                Sign in
                              </a>
                            </Link>
                          )
                        }
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      </Disclosure>
      <main className="w-screen h-screen bg-bg-primary">{children}</main>
    </>
  );
};

export default Layout;
