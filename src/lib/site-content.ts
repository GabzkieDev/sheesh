import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import campusMain from "@/assets/campus-main.jpg.asset.json";
import campusReal from "@/assets/campus-real.jpg.asset.json";
import { courses as defaultCourses, type Course } from "@/lib/courses";
import { courseImages } from "@/lib/course-images";

export type NewsItem = { date: string; tag: string; title: string; body: string };
export type Office = { name: string; email: string; phone: string };
export type CourseEntry = Course & { image?: string };

export const defaults = {
  images: { heroBg: campusReal.url, campusMain: campusMain.url },
  about: {
    mission:
      "To deliver accessible, tuition-free higher education that answers the real needs of General Santos City's industries and communities.",
    vision:
      "A city college recognized across Mindanao for competent graduates, honest service, and research rooted in local life.",
    mandate:
      "Established in 2025 by the City Government of General Santos as its own institution of higher learning.",
  },
  contact: {
    address: "Purok Maliwanag, Barangay Calumpang, General Santos City, Philippines 9500",
    email: "kolehiyodeheneral@gmail.com",
    facebook: "https://www.facebook.com/kolehiyoNgHeneralSantos",
    hours: "Monday to Friday, 8:00 AM – 5:00 PM\nSaturday, 8:00 AM – 12:00 NN (exam days only)",
    offices: [
      { name: "Office of Admissions", email: "kolehiyodeheneral@gmail.com", phone: "+63 (083) 552 4000" },
      { name: "Office of the Registrar", email: "kolehiyodeheneral@gmail.com", phone: "+63 (083) 552 4001" },
      { name: "Student Affairs", email: "kolehiyodeheneral@gmail.com", phone: "+63 (083) 552 4002" },
    ] as Office[],
  },
  news: [
    {
      date: "September 15, 2026",
      tag: "Campus",
      title: "Official campus groundbreaking ceremony for the Centennial Building",
      body: "City officials and the college community gathered at the Calumpang campus site for the ceremonial torch-lighting and groundbreaking of the first permanent academic building.",
    },
    {
      date: "September 10, 2026",
      tag: "Scholarships",
      title: "Now accepting scholarship applications for Academic Year 2026–2027",
      body: "City-funded scholarship slots are open to incoming and continuing students. Applications are received at the Office of Student Affairs.",
    },
    {
      date: "August 28, 2026",
      tag: "Admissions",
      title: "Entrance examination schedules released for first-year applicants",
      body: "Examinations run every Saturday at 8:00 AM. Applicants must present an exam permit and a valid identification card.",
    },
    {
      date: "August 12, 2026",
      tag: "Partnership",
      title: "College signs agreement with local farms and agri-enterprises",
      body: "The partnership provides on-the-job training slots and equipment support for the BS Agribusiness program.",
    },
  ] as NewsItem[],
  courses: defaultCourses.map((c) => ({ ...c, image: courseImages[c.slug] })) as CourseEntry[],
};

export type ContentKey = keyof typeof defaults;
export type ContentValue<K extends ContentKey> = (typeof defaults)[K];

export const contentQueryKey = (key: ContentKey) => ["site_content", key] as const;

export function useContent<K extends ContentKey>(key: K): ContentValue<K> {
  const { data } = useQuery({
    queryKey: contentQueryKey(key),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return (data?.value ?? null) as ContentValue<K> | null;
    },
    staleTime: 60_000,
  });
  if (!data) return defaults[key];
  if (key === "images" || key === "about" || key === "contact") {
    return { ...(defaults[key] as object), ...(data as object) } as ContentValue<K>;
  }
  return data;
}

export function courseImage(c: CourseEntry) {
  return c.image || courseImages[c.slug] || defaults.images.campusMain;
}
