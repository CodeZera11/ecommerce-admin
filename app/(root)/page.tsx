import { UserButton } from '@clerk/nextjs'

export default function Home() {
    return (
        <>
            <div>Hello Admin Dashboard</div>
            <UserButton afterSignOutUrl='/' />
        </>
    )
}