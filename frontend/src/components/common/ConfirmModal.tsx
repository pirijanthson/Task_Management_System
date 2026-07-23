interface ConfirmModalProps {

    title:string;

    message:string;

    onConfirm:()=>void;

    onCancel:()=>void;

}



export default function ConfirmModal({

    title,

    message,

    onConfirm,

    onCancel

}:ConfirmModalProps){


return (

<div

className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
p-4
"

>


<div

className="
bg-white
dark:bg-slate-800
rounded-2xl
shadow-2xl
p-6
w-full
max-w-md
transition-all
duration-300
"

>


<h2

className="
text-xl
font-bold
mb-3
text-slate-800
dark:text-white
"

>

{title}

</h2>





<p

className="
text-gray-600
dark:text-gray-300
mb-6
"

>

{message}

</p>







<div

className="
flex
justify-end
gap-3
"

>


<button

onClick={onCancel}

className="
px-5
py-2
rounded-lg

bg-gray-300
hover:bg-gray-400

dark:bg-slate-600
dark:text-white
dark:hover:bg-slate-500

transition
"

>

Cancel

</button>







<button

onClick={onConfirm}

className="
px-5
py-2
rounded-lg

bg-red-600
text-white

hover:bg-red-700

transition
"

>

Delete

</button>





</div>



</div>



</div>


);


}