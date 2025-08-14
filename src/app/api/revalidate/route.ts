import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type, slug } = body;

    console.log("🔄 Revalidate webhook triggered:", { _type, slug });

    if (_type === "page") {
      console.log(`📄 Revalidating page: /${slug}`);
      revalidatePath(`/${slug}`);
      revalidateTag(`project-${slug}`);
    } else if (_type === "homePage") {
      console.log("🏠 Revalidating homepage");
      revalidatePath("/");
      revalidateTag("projects");
      revalidateTag("settings");
    } else if (_type === "project") {
      console.log("📁 Revalidating projects");
      revalidatePath("/projects");
      revalidatePath("/");
      revalidateTag("projects");
      if (slug) {
        revalidateTag(`project-${slug}`);
      }
    } else if (_type === "settings") {
      console.log("⚙️ Revalidating settings");
      revalidatePath("/");
      revalidateTag("settings");
    } else if (_type === "lab") {
      console.log("🧪 Revalidating lab");
      revalidatePath("/lab");
      revalidatePath("/");
      revalidateTag("labs");
    }

    const response = {
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: slug || "homepage",
    };

    console.log("✅ Revalidation complete:", response);
    return Response.json(response);
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return Response.json(
      { message: "Error revalidating", error: error.message },
      { status: 500 },
    );
  }
}
