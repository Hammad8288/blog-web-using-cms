import { defineField, defineType } from "sanity";

export default defineType({
    name: "about",
    title: "About",
    type: "document",
    fields: [
        defineField({
            name: "introduction",
            title: "introduction",
            type: "text"
        }),
        defineField({
            name: "tecnicalSkills",
            title: "Tecnical Skills",
            type: "text",
        }),
        defineField({
            name: "personalInterests",
            title: "Personal Interests",
            type: "text",
        }),
        defineField({
            name: "profileImage",
            title: "profileImage",
            type: "image",
            options: {  
                hotspot: true,  
              },
        }),

    ]
});