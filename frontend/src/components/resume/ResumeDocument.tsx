import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ResumeData, ResumeEntry } from "../../types/resume";

Font.registerHyphenationCallback((word) => [word]);

const colors = {
  ink: "#172033",
  muted: "#526176",
  accent: "#0879a9",
  accentSoft: "#d8eef7",
  sidebar: "#10243a",
  sidebarMuted: "#bed2df",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: colors.white,
    color: colors.ink,
    fontFamily: "Helvetica",
    fontSize: 8,
  },
  sidebar: {
    width: "31%",
    height: "100%",
    backgroundColor: colors.sidebar,
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  main: {
    width: "69%",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    objectFit: "cover",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#38bdf8",
    marginBottom: 18,
  },
  sidebarSection: { marginBottom: 18 },
  sidebarHeading: {
    color: "#7dd3fc",
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 1.15,
    textTransform: "uppercase",
    borderBottomWidth: 0.6,
    borderBottomColor: "#31516b",
    paddingBottom: 4,
    marginBottom: 7,
  },
  contactItem: { marginBottom: 7 },
  contactLabel: {
    color: colors.sidebarMuted,
    fontSize: 6.5,
    textTransform: "uppercase",
    letterSpacing: 0.55,
    marginBottom: 1,
  },
  contactLink: { color: colors.white, fontSize: 7.3, textDecoration: "none" },
  location: { color: colors.white, fontSize: 7.3 },
  skillWrap: { flexDirection: "row", flexWrap: "wrap" },
  skill: {
    backgroundColor: "#1e3c56",
    color: colors.white,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 6.8,
  },
  course: {
    color: colors.sidebarMuted,
    fontSize: 7,
    marginBottom: 6,
    paddingLeft: 7,
  },
  bullet: { color: "#38bdf8" },
  header: {
    position: "relative",
    height: 58,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.accent,
    marginBottom: 13,
  },
  name: {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    color: colors.ink,
    letterSpacing: -0.35,
  },
  role: {
    position: "absolute",
    top: 34,
    left: 0,
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  section: { marginBottom: 11 },
  heading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: colors.accent,
    letterSpacing: 1,
    textTransform: "uppercase",
    borderBottomWidth: 0.6,
    borderBottomColor: colors.accentSoft,
    paddingBottom: 3,
    marginBottom: 6,
  },
  summary: { color: colors.muted, fontSize: 8.2, lineHeight: 1.38 },
  entry: { marginBottom: 8 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1.5 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 8.6, color: colors.ink, maxWidth: "70%" },
  period: { fontFamily: "Helvetica-Bold", fontSize: 7, color: colors.accent },
  organization: { fontFamily: "Helvetica-Bold", fontSize: 7.4, color: colors.muted, marginBottom: 2 },
  description: { color: colors.muted, fontSize: 7.3, lineHeight: 1.3 },
  projectsRow: { flexDirection: "row", justifyContent: "space-between" },
  project: { width: "48.5%" },
  projectTitle: { fontFamily: "Helvetica-Bold", fontSize: 8.3, color: colors.ink },
  projectLink: { color: colors.accent, textDecoration: "none" },
  projectDescription: { color: colors.muted, fontSize: 7, marginTop: 2, lineHeight: 1.27 },
  projectTech: { color: colors.accent, fontSize: 6.5, marginTop: 3 },
});

const SectionHeading = ({ children }: { children: string }) => (
  <Text style={styles.heading}>{children}</Text>
);

const Entry = ({ entry }: { entry: ResumeEntry }) => (
  <View style={styles.entry} wrap={false}>
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{entry.title}</Text>
      <Text style={styles.period}>{entry.period}</Text>
    </View>
    <Text style={styles.organization}>{entry.organization}</Text>
    <Text style={styles.description}>{entry.description}</Text>
  </View>
);

export const ResumeDocument = ({ data }: { data: ResumeData }) => (
  <Document
    title={`${data.profile.name} - Currículo`}
    author={data.profile.name}
    subject={data.profile.role}
    creator={`Portfolio - ${data.profile.name}`}
  >
    <Page size="A4" style={styles.page} wrap={false}>
      <View style={styles.sidebar}>
        <Image src={data.profile.avatarUrl} style={styles.photo} />

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarHeading}>{data.labels.contacts}</Text>
          {data.profile.location && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>{data.labels.location}</Text>
              <Text style={styles.location}>{data.profile.location}</Text>
            </View>
          )}
          {data.contacts.map((contact) => (
            <View key={contact.href} style={styles.contactItem}>
              <Text style={styles.contactLabel}>{contact.label}</Text>
              <Link src={contact.href} style={styles.contactLink}>
                {contact.value}
              </Link>
            </View>
          ))}
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarHeading}>{data.labels.skills}</Text>
          <View style={styles.skillWrap}>
            {data.skills.map((skill) => (
              <Text key={skill} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarHeading}>{data.labels.courses}</Text>
          {data.courses.map((course) => (
            <Text key={course} style={styles.course}>
              <Text style={styles.bullet}>• </Text>{course}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.profile.name}</Text>
          <Text style={styles.role}>{data.profile.role}</Text>
        </View>

        <View style={styles.section}>
          <SectionHeading>{data.labels.profile}</SectionHeading>
          <Text style={styles.summary}>{data.profile.summary}</Text>
        </View>

        <View style={styles.section}>
          <SectionHeading>{data.labels.experience}</SectionHeading>
          {data.experience.map((entry) => (
            <Entry key={`${entry.organization}-${entry.title}`} entry={entry} />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeading>{data.labels.education}</SectionHeading>
          {data.education.map((entry) => (
            <Entry key={`${entry.organization}-${entry.title}`} entry={entry} />
          ))}
        </View>

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>{data.labels.projects}</SectionHeading>
            <View style={styles.projectsRow}>
              {data.projects.map((project) => (
                <View key={project.title} style={styles.project} wrap={false}>
                  {project.href ? (
                    <Link src={project.href} style={[styles.projectTitle, styles.projectLink]}>
                      {project.title}
                    </Link>
                  ) : (
                    <Text style={styles.projectTitle}>{project.title}</Text>
                  )}
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  {project.technologies.length > 0 && (
                    <Text style={styles.projectTech}>{project.technologies.join(" · ")}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
);
