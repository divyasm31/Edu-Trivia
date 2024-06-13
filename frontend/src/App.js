import './App.css';
import { createBrowserRouter,Navigate,Outlet,RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout';
import Login from './components/Login';
import Register from './components/Register';
import Modules from './components/Modules';
import ErrorElement from './components/ErrorElement';
import { useSelector } from 'react-redux';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import TakeQuiz from './components/TakeQuiz';
import QuizPage from './components/QuizPage';
import Leaderboard from './components/Leaderboard';
import Stats from './components/Stats';
import Dashboard from './components/Dashboard';
function App() {
  let {currentUser} = useSelector(state=>state.userLoginReducer)
  const router=createBrowserRouter([
    {
    
          path:'',
          element:<RootLayout />,
          errorElement:<ErrorElement />,
          children:[
            {
              path:'',
              element:<Home />
            },
            {
              path:'/login',
              element:<Login />
            },
            {
              path:'register',
              element:<Register />
            },
            {
              path:`/modules/${currentUser.username}`,
              element:<Modules />,
            },
            {
              path:`/take-quiz/${currentUser.username}`,
              element:<TakeQuiz />
            },
            {
              path:`/modules/${currentUser.username}/test`,
              element:<QuizPage />
            },    
            {
              path:`/user-profile/${currentUser.username}`,
              element:<UserProfile />,
              children:[
                {
                  path:'',
                  element:<Navigate to={`/user-profile/${currentUser.username}/overall`} />
                },
                {
                  path:`/user-profile/${currentUser.username}/:module`,
                  element:<Dashboard />
                }
              ]
            },
            {
              path:'/modules',
              element:<Modules />
            },
            {
              path:`/stats/${currentUser.username}`,
              element:<Stats />,
              children:[
              {
                path:'',
                element:<Navigate to={`/stats/${currentUser.username}/overall`} />
              },
              {
                path:`/stats/${currentUser.username}/:module`,
                element:<Leaderboard />
              }
              ]
            }
        
      ]
    }
  ])
  return (
    <div className="App" style={{backgroundColor:"rgb(5, 6, 23)"}}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
