import { Home, Package2, User, NotepadText, Waypoints, ListTodo, GanttChartIcon } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { SignOutButton, useUser, useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import userService from "../services/user.service";
import { setUser } from "../state/global/globalSlice";
import { UserRoles } from "../models";
import ProtectedWrapper from "../components/wrappers/ProtectedWrapper";

const MainLayout = () => {
  const navigate = useNavigate();
  const user = useUser();
  const userInState = useAppSelector((state) => state.global.user);
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();

  useEffect(() => {
    console.log("🚀 ~ file: Dashboard.tsx:31 ~ getUser ~ user:", user);
    async function getUser() {
      try {
        if (!user?.user?.id) throw new Error("User not found");
        const u = await userService.getUserByClerkId(user?.user?.id);
        if (u) {
          console.log(u);
          dispatch(setUser(u));
        } else {
          signOut();
          dispatch(setUser(null));
          return navigate("/login");
        }
      } catch (error) {
        console.error(error);
        signOut();
        dispatch(setUser(null));
        return navigate("/login");
      }
    }

    if (!user?.isSignedIn && user?.isLoaded) {
      dispatch(setUser(null));
      signOut();

      return navigate("/login");
    } else if (user?.isSignedIn && user?.isLoaded && !userInState) {
      getUser();
    }
  }, [user?.isSignedIn, dispatch, navigate]);

  const handleOnClickProfile = () => {
    navigate("/profile");
  };



  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-4'>
          <Link
            to='#'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'>
            {/* <img className='h-4 w-4 transition-all group-hover:scale-110' /> */}
            <img src='/logo.png' alt='logo' className='h-8 w-auto transition-all group-hover:scale-110' />

            <span className='sr-only'>Power Gym</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='/dashboard'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                <Home className='h-5 w-5' />
                <span className='sr-only'>Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Dashboard</TooltipContent>
          </Tooltip>

          <ProtectedWrapper roles={[UserRoles.ADMIN, UserRoles.TRAINER]}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={"/exercise-plan-form"}
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                  <NotepadText className='h-5 w-5' />
                  <span className='sr-only'>Exercise Plan form</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Exercise Plan form</TooltipContent>
            </Tooltip>
          </ProtectedWrapper>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/exercise-plans"}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                <Waypoints className='h-5 w-5' />
                <span className='sr-only'>Exercise Plan</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Exercise Plan</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/progress-records"}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                <GanttChartIcon className='h-5 w-5' />
                <span className='sr-only'>Progress Record</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Progress Record</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/all-users"}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                <User className='h-5 w-5' />
                <span className='sr-only'>All Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>All Users</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/requested-plans"}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                <ListTodo className='h-5 w-5' />
                <span className='sr-only'>Request Plans</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Request Plans</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-20 sm:pr-8 min-h-screen'>
        <header className='sticky justify-end top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>{userInState?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={handleOnClickProfile}>Profile</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div>
                  <SignOutButton redirectUrl='/login' />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
