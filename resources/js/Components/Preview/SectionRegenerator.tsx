import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function SectionRegenerator({
    section,
    productInput,
    existingContent,
    onRegenerated,
}: any) {
    const mutation = useMutation({
        mutationFn: (data: any) => axios.post("/api/generate/section", data),
        onSuccess: (response: any) => {
            if (response.data?.success && onRegenerated) {
                
                onRegenerated(section, response.data.data);
            } else {
                
                const details = response.data?.details
                    ? `\n\nDetail: ${response.data.details}`
                    : "";
                alert(
                    "Gagal regenerasi seksi: " +
                        (response.data?.error ||
                            "Terjadi kesalahan internal.") +
                        details,
                );
            }
        },
        onError: (error: any) => {
            const errorMsg =
                error.response?.data?.error ||
                error.message ||
                "Terjadi kesalahan pada koneksi server / AI.";
            const details = error.response?.data?.details
                ? `\n\nDetail: ${error.response.data.details}`
                : "";
            alert(
                `Oops! Gagal regenerasi seksi (Server Error):\n\n${errorMsg}${details}`,
            );
        },
    });

    const handleRegenerate = () => {
        mutation.mutate({
            section,
            product_input: productInput,
            existing_content: existingContent,
        });
    };

    return (
        <button
            onClick={handleRegenerate}
            disabled={mutation.isPending}
            className="px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-semibold rounded shadow-lg backdrop-blur-sm transition-all"
        >
            {mutation.isPending ? "Regenerating..." : "Regenerate"}
        </button>
    );
}
