import SideBar from '../../Components/admin/AdminSideBar'

export default function Layout({ children }) {
  return (
    <>
    <SideBar />
    <div className='w-full flex justify-end'>
      <div className='w-[80%]'>
        {children}
      </div>
    </div>
  </>
  );
}