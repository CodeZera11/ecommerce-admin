"use client"

import { useOrigin } from '@/hooks/use-origin'
import Heading from './Heading'
import { Separator } from './ui/separator'
import { useParams } from 'next/navigation'
import ApiAlert from './api-alert'

interface ApiListProps {
    name: String,
    idName: String
}

const ApiList: React.FC<ApiListProps> = ({
    name,
    idName
}) => {

    const origin = useOrigin();
    const params = useParams();

    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <div>
            <div className='mb-5'>
                <Heading title='API' description={`API calls for ${name}`} />
            </div>
            <Separator className='mb-4' />

            <div className='space-y-4'>
                <ApiAlert
                    title="GET"
                    description={`${baseUrl}/${name}`}
                    variant='public'
                />
                <ApiAlert
                    title="GET"
                    description={`${baseUrl}/${name}/{${idName}}`}
                    variant='public'
                />
                <ApiAlert
                    title="POST"
                    description={`${baseUrl}/${name}`}
                    variant='admin'
                />
                <ApiAlert
                    title="PATCH"
                    description={`${baseUrl}/${name}/{${idName}}`}
                    variant='admin'
                />
                <ApiAlert
                    title="DELETE"
                    description={`${baseUrl}/${name}/{${idName}}`}
                    variant='admin'
                />
            </div>

        </div>
    )
}

export default ApiList