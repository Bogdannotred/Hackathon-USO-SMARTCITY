import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SmartParkingSystem from "./SmartParkingSystem";

describe("SmartParkingSystem", () => {
  it("renders the main heading", () => {
    render(<SmartParkingSystem />);
    expect(screen.getByText("Smart Parking System")).toBeInTheDocument();
  });

  it("renders the header with logo and profile", () => {
    render(<SmartParkingSystem />);
    expect(screen.getByText("SmartPark")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders parking locations", () => {
    render(<SmartParkingSystem />);
    expect(screen.getByText("Parking primarie")).toBeInTheDocument();
    expect(screen.getByText("Parking Lotus")).toBeInTheDocument();
  });

  it("shows available and occupied spots", () => {
    render(<SmartParkingSystem />);
    expect(screen.getAllByText("Available Spots").length).toBe(2);
    expect(screen.getAllByText("Occupied Spots").length).toBe(2);
  });

  it("shows my parking information", () => {
    render(<SmartParkingSystem />);
    expect(screen.getByText("My Parking Spot")).toBeInTheDocument();
    expect(screen.getByText("B-123-XYZ")).toBeInTheDocument();
  });

  it("toggles profile dropdown when clicking profile button", () => {
    render(<SmartParkingSystem />);

    // Profile dropdown should not be visible initially
    expect(screen.queryByText("Account")).not.toBeInTheDocument();

    // Click on profile button
    const profileButton = screen.getByAltText("Profile picture");
    fireEvent.click(profileButton);

    // Profile dropdown should now be visible
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("shows spot details when clicking on an available spot", () => {
    render(<SmartParkingSystem />);

    // Spot details should not be visible initially
    expect(screen.queryByText("Spot Details")).not.toBeInTheDocument();

    // Click on "View Details" button of an available spot
    const viewDetailsButtons = screen.getAllByText("View Details");
    fireEvent.click(viewDetailsButtons[0]);

    // Spot details should now be visible
    expect(screen.getByText("Spot Details")).toBeInTheDocument();

    // Click on Close button
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Spot details should be hidden again
    expect(screen.queryByText("Spot Details")).not.toBeInTheDocument();
  });
});
