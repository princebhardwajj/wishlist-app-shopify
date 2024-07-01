import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  useBreakpoints,
  Divider,
  Button,
} from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

// Import prisma db
import db  from "../db.server";

export async function loader(){
  // get data from database
  let settings =  await db.settings.findFirst();

  return json(settings); 
}

export async function action({request}) {
  // updates persistent data
  let settings = await request.formData();
  settings = Object.fromEntries(settings);

  //upadte database
  await db.settings.upsert({
    where: {
      id: 1
    },
    update: {
      id: 1,
      name: settings.name,
      description: settings.description
    },
    create: {
      id: 1,
      name: settings.name,
      description: settings.description
    }
  })

  return json(settings)
}


export default function SettingsPage() {

  const settings = useLoaderData();
  console.log(settings);

  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app setting and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="post">
              <BlockStack gap="400">
              <TextField label="App name" name="name" value={formState?.name || 'Wishlist Inspire'} onChange={(value) => setFormState({...formState, name: value}) } />

                <TextField label="Description" name="description" value={formState?.description || 'Wishlist Inspire Description'} onChange={(value) => setFormState({...formState, description: value}) } />
                <Button submit={true} >Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>

      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
