'use client'
import { useFormStatus } from "react-dom";

/**
 * form 전송 버튼
 *
 * @param {string} text - 버튼명
 */
export default function ButtonSubmit({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {text}
            {pending && <span className='button-loading' />}
        </button>
    );
}