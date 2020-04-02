

export const hideObjectIfTrue = (value, object) => {
    if (!value) object.style.display = "none";
    else object.style.display = "block"
    object.onchange("hide");
}