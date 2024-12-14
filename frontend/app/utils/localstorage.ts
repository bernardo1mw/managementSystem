export const setLocalStorage = (items: any) => {
  const { 
    token, 
    email, 
    is_admin, 
    linked_emails, 
    is_org_admin, 
    organization, 
    license,
    outreach_token
  } = items;
  
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("admin", is_admin);
  localStorage.setItem('linked_emails', JSON.stringify(linked_emails));
  localStorage.setItem("org_admin", is_org_admin);
  localStorage.setItem("organization", JSON.stringify(organization));
  localStorage.setItem("license", JSON.stringify(license));
  localStorage.setItem("outreach_token", outreach_token);
}
