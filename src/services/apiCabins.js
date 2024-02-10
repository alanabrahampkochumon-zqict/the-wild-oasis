import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins couldn't be loaded.");
    }
    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");

    if (id) {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    } else {
        query = query.insert({ ...newCabin, image: imagePath });
    }
    const { data, error } = await query.select();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }

    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data[0].id);
        console.log(storageError);
        throw new Error(
            "Cabin image couldn't be uploaded so the cabin was not created."
        );
    }

    return data;
}
