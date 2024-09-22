// Import necessary AssemblyScript libraries
import { JSON, JSONDecoder, JSONHandler } from "assemblyscript-json/assembly";

// Define a Tag type, similar to how your `Message` structure works
interface Tag {
  name: string;
  value: string;

}

// Define the Message structure based on your AoLoader requirements
interface Message {
  Signature: string | null;
  Owner: string;
  Target: string;
  Anchor: string | null;
  Tags: Tag[];
  From: string;
  ForwardedBy: string | null;
  Epoch: string | null;
  Nonce: string | null;
  BlockHeight: string;
  Timestamp: string;
  HashChain: string | null;
  Cron: boolean;
}

// Define the Environment structure
interface IProcess {
  Id: string;
  Owner: string;
  Tags: Tag[];
}
interface Environment {
    Process: IProcess

}

// The handle function that matches AoLoader's expected signature
export function handle(msgJSON: string, envJSON: string): string {
  // Parse the incoming JSON strings
  let msg: Message = parseMessage(msgJSON);
  let env: Environment = parseEnvironment(envJSON);

  // Handle the message (example processing, replace with real logic)
  let response = handleProcess(msg, env);
  let responseJson = JSON.from(response)

  // Convert the response to JSON
  return responseJson.stringify();
}

// Parses the incoming message from JSON
function parseMessage(jsonString: string): Message {
  try {
    // Parse the JSON string and cast it to Message
    const parsed = JSON.parse(jsonString) as Partial<Message>;

    // Validate required fields exist and return as a Message type
    if (parsed && typeof parsed.Owner === 'string' && typeof parsed.Target === 'string') {
      return parsed as Message;
    } else {
      throw new Error("Invalid message format");
    }
  } catch (error) {
    console.error("Failed to parse message:", error);
    throw new Error("Message parsing failed");
  }
}

// Parses the incoming environment from JSON
function parseEnvironment(jsonString: string): Environment {
  try {
    // Parse the JSON string and cast it to Message
    const parsed = JSON.parse(jsonString) as Partial<Environment>;

    // Validate required fields exist and return as a Message type
    if (parsed) {
      return parsed as Environment;
    } else {
      throw new Error("Invalid Environment format");
    }
  } catch (error) {
    console.error("Failed to parse message:", error);
    throw new Error("Environment parsing failed");
  }
}

// Handles the actual process logic (replace with real logic)
function handleProcess(msg: Message, env: Environment): object {
  // Implement your process logic here
  // Example: Just echo back the msg and env data
  return {
    ok: true,
    response: {
      message: "Processed",
      msg,
      env
    }
  };
}
