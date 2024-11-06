import { useScript } from "@deco/deco/hooks";
import { useComponent } from "../Component.tsx";
import type { AppContext } from "../../apps/site.ts";

const onLoad = () => {
    (document.getElementById("cpf") as HTMLInputElement).oninput = (e) => {
        const target = e.target as HTMLInputElement;
        const value = target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            target.value = value.replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
            target.value = value.replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1/$2")
                .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
        }
    };

    (document.getElementById("phone") as HTMLInputElement).oninput = (e) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value.replace(/\D/g, "");
        if (value.length > 10) {
            target.value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else {
            target.value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
    };
};

export default function Form({
    toast = null,
    message = "Formulario enviado com sucesso!",
}) {
    return (
        <div>
            <div class="container px-5 relative">
                {toast === "success" && (
                    <div class="toast toast-end">
                        <div class="alert alert-success text-white">
                            <span>{message}</span>
                        </div>
                    </div>
                )}

                {toast === "error" && (
                    <div class="toast toast-end">
                        <div class="alert alert-error text-white">
                            <span>{message}</span>
                        </div>
                    </div>
                )}

                <form
                    class="p-8 w-full mx-auto my-8 bg-white rounded-[10px]"
                    hx-swap="outerHTML"
                    hx-post={useComponent(import.meta.url)}
                    hx-target="closest section"
                >
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="email"
                        >
                            E-mail*
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Digite aqui"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="fullName"
                        >
                            Nome completo*
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Digite aqui"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="cpf"
                        >
                            CPF/CNPJ*
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cpf"
                            type="text"
                            name="cpf"
                            placeholder="Digite aqui"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="phone"
                        >
                            Telefone*
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Digite aqui"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="orderNumber"
                        >
                            Número do pedido (opcional)
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="orderNumber"
                            type="text"
                            name="orderNumber"
                            placeholder="Digite aqui"
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="reason"
                        >
                            Motivo do seu contato*
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="reason"
                            type="text"
                            name="reason"
                            placeholder="Digite aqui"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="subject"
                        >
                            Assunto*
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="subject"
                            type="text"
                            name="subject"
                            placeholder="Digite aqui"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-xs font-bold mb-2"
                            htmlFor="message"
                        >
                            Descrição*
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded min-h-[300px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            name="message"
                            placeholder="Digite aqui"
                            required
                        >
                        </textarea>
                    </div>
                    <div class="flex items-center justify-center lg:justify-start">
                        <button
                            class="bg-black font-bold py-3 px-4 rounded rounded-[30px] w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            <span class="[.htmx-request_&]:hidden inline text-white ">
                                ENVIAR
                            </span>
                            <span class="[.htmx-request_&]:inline-block hidden loading loading-spinner text-white" />
                        </button>
                    </div>
                </form>
                <script
                    type="text/javascript"
                    defer
                    dangerouslySetInnerHTML={{
                        __html: useScript(onLoad),
                    }}
                />
            </div>
        </div>
    );
}

export const action = async (
    _props: unknown,
    req: Request,
    ctx: AppContext,
) => {
    const form = await req.formData();

    const cpf = `${form.get("cpf") ?? ""}`;
    const email = `${form.get("email") ?? ""}`;
    const phone = `${form.get("phone") ?? ""}`;
    const fullName = `${form.get("fullName") ?? ""}`;
    const orderNumber = `${form.get("orderNumber") ?? ""}`;
    const reason = `${form.get("reason") ?? ""}`;
    const subject = `${form.get("subject") ?? ""}`;
    const message = `${form.get("message") ?? ""}`;

    try {
        // deno-lint-ignore no-explicit-any
        await (ctx as any).invoke(
            "vtex.actions.masterdata.createDocument",
            {
                acronym: "CT",
                data: {
                    cpf,
                    email,
                    phone,
                    reason,
                    message,
                    subject,
                    fullName,
                    orderNumber,
                },
            },
        );

        return {
            toast: "success",
            message: "Menssagem enviada com sucesso!",
        };
    } catch {
        return {
            toast: "error",
            message: "Erro ao enviar a mensagem. Tente novamente mais tarde.",
        };
    }
};
