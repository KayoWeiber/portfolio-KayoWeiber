import { Document, Image, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  ResumeBuilderData,
  ResumeDocumentLabels,
  ResumeTemplateId,
} from "../types/resumeBuilder";
import { formatMonth, normalizeUrl } from "../utils/format";

interface DocumentProps {
  data: ResumeBuilderData;
  labels: ResumeDocumentLabels;
  locale: string;
}

const palette = {
  ink: "#111827",
  muted: "#4b5563",
  line: "#d1d5db",
  blue: "#0369a1",
  blueDark: "#0f2942",
  blueSoft: "#e0f2fe",
  white: "#ffffff",
};

const createStyles = (template: ResumeTemplateId, compact: boolean) => {
  const modern = template === "modern";
  const minimal = template === "minimal";
  const accent = modern ? palette.blue : minimal ? "#475569" : palette.ink;
  const fontSize = compact ? 7.4 : 8.3;

  return StyleSheet.create({
    page: { backgroundColor: palette.white, color: palette.ink, fontFamily: "Helvetica", fontSize, padding: modern ? 0 : minimal ? 38 : 32 },
    modernPage: { flexDirection: "row", padding: 0 },
    sidebar: { width: "31%", minHeight: "100%", backgroundColor: palette.blueDark, color: palette.white, padding: compact ? 19 : 23 },
    main: { width: "69%", padding: compact ? 23 : 29 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: compact ? 12 : 16, paddingBottom: minimal ? 12 : 15, borderBottomWidth: minimal ? 0.5 : 1.2, borderBottomColor: accent },
    identity: { flexGrow: 1 },
    name: { fontFamily: "Helvetica-Bold", fontSize: compact ? 21 : 25, lineHeight: 1.1, color: palette.ink },
    modernName: { fontSize: compact ? 23 : 27, color: palette.ink },
    title: { fontFamily: "Helvetica-Bold", fontSize: compact ? 8.5 : 10, color: accent, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.7 },
    photo: { objectFit: "cover", borderRadius: 40, marginRight: 15 },
    sidebarPhoto: { objectFit: "cover", borderRadius: 45, alignSelf: "center", marginBottom: 20, borderWidth: 2, borderColor: "#38bdf8" },
    contacts: { flexDirection: "row", flexWrap: "wrap", marginBottom: compact ? 9 : 12 },
    contact: { color: palette.muted, fontSize: compact ? 6.8 : 7.5, marginRight: 9, marginBottom: 3, textDecoration: "none" },
    sidebarContact: { color: "#dbeafe", fontSize: compact ? 6.7 : 7.4, marginBottom: 7, textDecoration: "none" },
    section: { marginBottom: compact ? 8 : minimal ? 14 : 11 },
    sectionTitle: { fontFamily: "Helvetica-Bold", fontSize: compact ? 8.2 : 9.2, color: accent, textTransform: "uppercase", letterSpacing: 0.8, paddingBottom: 3, marginBottom: compact ? 4 : 6, borderBottomWidth: minimal ? 0 : 0.6, borderBottomColor: modern ? palette.blueSoft : palette.line },
    sidebarTitle: { color: "#7dd3fc", borderBottomColor: "#31516b", marginTop: 4 },
    paragraph: { color: palette.muted, fontSize, lineHeight: 1.35 },
    entry: { marginBottom: compact ? 6 : 8 },
    entryHeader: { flexDirection: "row", justifyContent: "space-between" },
    entryTitle: { fontFamily: "Helvetica-Bold", fontSize: compact ? 8 : 9, maxWidth: "70%" },
    period: { fontFamily: "Helvetica-Bold", fontSize: compact ? 6.5 : 7.2, color: accent },
    organization: { fontFamily: "Helvetica-Bold", color: palette.muted, fontSize: compact ? 6.8 : 7.5, marginTop: 1, marginBottom: 2 },
    details: { color: palette.muted, fontSize: compact ? 6.8 : 7.5, lineHeight: 1.3 },
    detailLabel: { fontFamily: "Helvetica-Bold", color: palette.ink },
    tags: { flexDirection: "row", flexWrap: "wrap" },
    tag: { borderRadius: 3, backgroundColor: modern ? "#1d425f" : "#f1f5f9", color: modern ? palette.white : palette.ink, paddingHorizontal: 5, paddingVertical: 2.5, marginRight: 4, marginBottom: 4, fontSize: compact ? 6.3 : 7 },
    listRow: { marginBottom: compact ? 4 : 6 },
    listTitle: { fontFamily: "Helvetica-Bold", fontSize: compact ? 7.2 : 8 },
    listMeta: { color: palette.muted, fontSize: compact ? 6.5 : 7.2, marginTop: 1 },
    link: { color: accent, textDecoration: "none" },
    sidebarText: { color: "#dbeafe" },
  });
};

const getPeriod = (start: string, end: string, current: boolean, labels: ResumeDocumentLabels, locale: string) =>
  [formatMonth(start, locale), current ? labels.present : formatMonth(end, locale)].filter(Boolean).join(" — ");

const photoPoints = { small: 52, medium: 64, large: 78 } as const;

export const VisitorResumeDocument = ({ data, labels, locale }: DocumentProps) => {
  const visible = data.settings.visibleSections;
  const compact =
    data.experiences.length + data.education.length + data.projects.length + data.courses.length > 9;
  const styles = createStyles(data.settings.template, compact);
  const photoSize = photoPoints[data.settings.photoSize];
  const showPhoto = data.settings.includePhoto && Boolean(data.personal.photoDataUrl);
  const contacts = [
    { value: data.personal.phone, href: data.personal.phone ? `tel:${data.personal.phone.replace(/\D/g, "")}` : "" },
    { value: data.personal.email, href: data.personal.email ? `mailto:${data.personal.email}` : "" },
    { value: data.personal.location, href: "" },
    { value: data.personal.linkedin, href: normalizeUrl(data.personal.linkedin) },
    { value: data.personal.github, href: normalizeUrl(data.personal.github) },
    { value: data.personal.website, href: normalizeUrl(data.personal.website) },
    ...data.personal.links.map((item) => ({
      value: [item.label, item.url].filter(Boolean).join(": "),
      href: normalizeUrl(item.url),
    })),
  ].filter((contact) => contact.value);

  const ContactItems = ({ sidebar = false }: { sidebar?: boolean }) => (
    <>
      {contacts.map((contact) => contact.href ? (
        <Link key={`${contact.value}-${contact.href}`} src={contact.href} style={sidebar ? styles.sidebarContact : styles.contact}>{contact.value}</Link>
      ) : (
        <Text key={contact.value} style={sidebar ? styles.sidebarContact : styles.contact}>{contact.value}</Text>
      ))}
    </>
  );

  const Summary = () => visible.summary && data.summary ? (
    <View style={styles.section} wrap={false}><Text style={styles.sectionTitle}>{labels.summary}</Text><Text style={styles.paragraph}>{data.summary}</Text></View>
  ) : null;

  const Experiences = () => data.experiences.some((item) => item.company || item.role) ? (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{labels.experience}</Text>
      {data.experiences.filter((item) => item.company || item.role).map((item) => (
        <View key={item.id} style={styles.entry} wrap={false}>
          <View style={styles.entryHeader}><Text style={styles.entryTitle}>{item.role || item.company}</Text><Text style={styles.period}>{getPeriod(item.startDate, item.endDate, item.current, labels, locale)}</Text></View>
          <Text style={styles.organization}>{[item.company, item.location].filter(Boolean).join(" · ")}</Text>
          {item.description && <Text style={styles.details}>{item.description}</Text>}
          {item.responsibilities && <Text style={styles.details}><Text style={styles.detailLabel}>{labels.responsibilities}: </Text>{item.responsibilities.replace(/\n+/g, " · ")}</Text>}
          {item.results && <Text style={styles.details}><Text style={styles.detailLabel}>{labels.results}: </Text>{item.results.replace(/\n+/g, " · ")}</Text>}
          {item.technologies.length > 0 && <Text style={styles.details}><Text style={styles.detailLabel}>{labels.technologies}: </Text>{item.technologies.join(" · ")}</Text>}
        </View>
      ))}
    </View>
  ) : null;

  const EducationList = () => data.education.some((item) => item.course || item.institution) ? (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{labels.education}</Text>
      {data.education.filter((item) => item.course || item.institution).map((item) => (
        <View key={item.id} style={styles.listRow} wrap={false}>
          <View style={styles.entryHeader}><Text style={styles.listTitle}>{item.course || item.institution}</Text><Text style={styles.period}>{getPeriod(item.startDate, item.endDate, item.current, labels, locale)}</Text></View>
          <Text style={styles.listMeta}>{[item.degreeType, item.institution].filter(Boolean).join(" · ")}</Text>
          {item.description && <Text style={styles.details}>{item.description}</Text>}
        </View>
      ))}
    </View>
  ) : null;

  const Skills = ({ sidebar = false }: { sidebar?: boolean }) => data.skills.length > 0 ? (
    <View style={styles.section}><Text style={[styles.sectionTitle, sidebar ? styles.sidebarTitle : undefined]}>{labels.skills}</Text><View style={styles.tags}>{data.skills.map((skill) => <Text key={skill} style={styles.tag}>{skill}</Text>)}</View></View>
  ) : null;

  const Languages = ({ sidebar = false }: { sidebar?: boolean }) => visible.languages && data.languages.some((item) => item.name) ? (
    <View style={styles.section}><Text style={[styles.sectionTitle, sidebar ? styles.sidebarTitle : undefined]}>{labels.languages}</Text>{data.languages.filter((item) => item.name).map((item) => <Text key={item.id} style={[styles.listMeta, sidebar ? styles.sidebarText : undefined]}>{item.name} · {labels.languageLevels[item.level]}</Text>)}</View>
  ) : null;

  const Courses = ({ sidebar = false }: { sidebar?: boolean }) => visible.courses && data.courses.some((item) => item.name) ? (
    <View style={styles.section}><Text style={[styles.sectionTitle, sidebar ? styles.sidebarTitle : undefined]}>{labels.courses}</Text>{data.courses.filter((item) => item.name).map((item) => <View key={item.id} style={styles.listRow} wrap={false}>{item.credentialUrl ? <Link src={normalizeUrl(item.credentialUrl)} style={[styles.listTitle, styles.link, sidebar ? styles.sidebarText : undefined]}>{item.name}</Link> : <Text style={[styles.listTitle, sidebar ? styles.sidebarText : undefined]}>{item.name}</Text>}<Text style={[styles.listMeta, sidebar ? styles.sidebarText : undefined]}>{[item.institution, formatMonth(item.date, locale), item.workload].filter(Boolean).join(" · ")}</Text></View>)}</View>
  ) : null;

  const Projects = () => visible.projects && data.projects.some((item) => item.name) ? (
    <View style={styles.section}><Text style={styles.sectionTitle}>{labels.projects}</Text>{data.projects.filter((item) => item.name).map((item) => <View key={item.id} style={styles.listRow} wrap={false}>{item.projectUrl || item.repositoryUrl ? <Link src={normalizeUrl(item.projectUrl || item.repositoryUrl)} style={[styles.listTitle, styles.link]}>{item.name}</Link> : <Text style={styles.listTitle}>{item.name}</Text>}{item.description && <Text style={styles.details}>{item.description}</Text>}{item.technologies.length > 0 && <Text style={styles.listMeta}>{item.technologies.join(" · ")}</Text>}</View>)}</View>
  ) : null;

  if (data.settings.template === "modern") {
    return (
      <Document title={`${data.personal.fullName} - Resume`} author={data.personal.fullName}>
        <Page size="A4" style={[styles.page, styles.modernPage]}>
          <View style={styles.sidebar}>
            {showPhoto && <Image src={data.personal.photoDataUrl} style={[styles.sidebarPhoto, { width: photoSize, height: photoSize }]} />}
            <Text style={[styles.sectionTitle, styles.sidebarTitle]}>{labels.contact}</Text>
            <ContactItems sidebar />
            <Skills sidebar />
            <Languages sidebar />
            <Courses sidebar />
          </View>
          <View style={styles.main}>
            <View style={styles.header}><View style={styles.identity}><Text style={[styles.name, styles.modernName]}>{data.personal.fullName || "—"}</Text><Text style={styles.title}>{data.personal.professionalTitle}</Text></View></View>
            <Summary /><Experiences /><EducationList /><Projects />
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document title={`${data.personal.fullName} - Resume`} author={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} wrap={false}>
          {showPhoto && <Image src={data.personal.photoDataUrl} style={[styles.photo, { width: photoSize, height: photoSize }]} />}
          <View style={styles.identity}><Text style={styles.name}>{data.personal.fullName || "—"}</Text><Text style={styles.title}>{data.personal.professionalTitle}</Text></View>
        </View>
        <View style={styles.contacts}><ContactItems /></View>
        <Summary /><Skills /><Experiences /><EducationList /><Courses /><Languages /><Projects />
      </Page>
    </Document>
  );
};
