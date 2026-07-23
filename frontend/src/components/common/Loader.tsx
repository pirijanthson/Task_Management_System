interface LoaderProps {

    fullScreen?: boolean;

}


export default function Loader({

    fullScreen = false

}:LoaderProps){


    return (

        <div

        className={`
        
        flex
        justify-center
        items-center

        ${
            fullScreen
            ?
            "min-h-screen"
            :
            "py-10"
        }

        `}

        >


            <div

            className="
            w-12
            h-12
            border-4
            border-blue-600
            dark:border-blue-400
            border-t-transparent
            rounded-full
            animate-spin
            "

            >

            </div>


        </div>

    );

}